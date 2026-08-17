import { env } from '$env/dynamic/private';
import { DOMParser } from '@xmldom/xmldom';
globalThis.DOMParser = DOMParser;
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
	credentials: {
		accessKeyId: env.S3_ACCESS_KEY,
		secretAccessKey: env.S3_SECRET_KEY
	},
	endpoint: env.S3_ENDPOINT,
	region: env.S3_REGION,
	signatureVersion: 'v4'
});

/** @type {import('./$types').PageLoad} */
export async function load({ platform, url, setHeaders }) {
	let prefix = decodeURIComponent(url.searchParams.get('prefix') || '');
	if (prefix === '/') prefix = '';

	const command = new ListObjectsV2Command({
		Bucket: env.S3_BUCKET,
		Prefix: prefix,
		Delimiter: '/'
	});

	let isTruncated = true;
	let contentArray = [];
	let prefixArray = [];

	while (isTruncated) {
		const { Contents, CommonPrefixes, IsTruncated, NextContinuationToken } = await s3.send(command);
		if (Contents !== undefined) contentArray = contentArray.concat(Contents);
		if (CommonPrefixes !== undefined) prefixArray = prefixArray.concat(CommonPrefixes);
		isTruncated = IsTruncated;
		command.input.ContinuationToken = NextContinuationToken;
	}

	const data = { CommonPrefixes: prefixArray, Contents: contentArray };

	let up = prefix.split('/').slice(0, -2).join('/');
	if (up.length > 0) up += '/';

	const cacheable = {
		prefix,
		folders: [
			...(prefix.length > 1
				? [
					{
						name: '..',
						path: '',
						url: `/?prefix=${encodeURIComponent(up)}`
					}
				]
				: []),
			...(data.CommonPrefixes?.map(({ Prefix }) => ({
				name: Prefix.slice(prefix.length),
				path: Prefix,
				url: `/?prefix=${encodeURIComponent(Prefix)}`
			})) || [])
		],
		objects:
			data.Contents?.map(({ Key, LastModified, Size }) => ({
				name: Key.slice(prefix.length),
				lastModified: LastModified,
				size: Size,
				path: Key,
				url: encodeURI(`${env.CDN}/${Key}`)
			})) || []
	};

	setHeaders({
		'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400'
	});

	return cacheable;
}
