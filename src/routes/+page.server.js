import {
	CDN,
	S3_ACCESS_KEY,
	S3_BUCKET,
	S3_ENDPOINT,
	S3_REGION,
	S3_SECRET_KEY
} from '$env/static/private';

import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
	credentials: {
		accessKeyId: S3_ACCESS_KEY,
		secretAccessKey: S3_SECRET_KEY
	},
	endpoint: S3_ENDPOINT,
	region: S3_REGION,
	signatureVersion: 'v4'
});

/** @type {import('./$types').PageLoad} */
export async function load({ platform, url }) {
	let prefix = decodeURIComponent(url.searchParams.get('prefix') || '');
	if (prefix === '/') prefix = '';

	if (platform?.env?.CACHE) {
		const data = await platform.env.CACHE.get(prefix || '/');
		if (data) return JSON.parse(data);
	}

	const command = new ListObjectsV2Command({
		Bucket: S3_BUCKET,
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
	console.log(prefixArray);

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
				url: encodeURI(`${CDN}/${Key}`)
			})) || []
	};

	if (platform?.env?.CACHE) await platform.env.CACHE.put(prefix || '/', JSON.stringify(cacheable), { expirationTtl: 3600 }); // cache for an hour

	return cacheable;
}
