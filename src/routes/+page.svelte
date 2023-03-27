<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import filesize from 'file-size';
	import TableRow from '../components/TableRow.svelte';

	const { prefix, folders, objects } = data;
	let folderCount = folders[0].name === '..' ? folders.length - 1 : folders.length;
	let breadcrumbParts = prefix.split('/').slice(0, -1);
</script>

<svelte:head>
	<title>Left4Craft Downloads</title>
</svelte:head>

<main>
	<div class="m-2 mb-4 sm:p-8">
		<h1 class="text-2xl md:text-4xl font-bold mb-8">Left4Craft Downloads</h1>
		<p class="text-lg">
			This page allows you to browse Left4Craft's archives, primarily for the old worlds. For more
			information about downloading old worlds, see
			<a href="https://wiki.left4craft.org/old-worlds/" class="link" rel="external">the wiki page</a
			>.
		</p>
	</div>

	<div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
		<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
			{#if objects.length > 10}
				<div class="p-2 px-4 mb-8 border-2 border-cyan-500 rounded-lg shadow-md">
					<div class="flex items-center justify-start gap-2 md:gap-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-8 h-8 text-cyan-500"
						>
							<path
								fill-rule="evenodd"
								d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
								clip-rule="evenodd"
							/>
						</svg>
						<div class="font-semibold text-lg">
							Press
							<span
								class="text-cyan-500 bg-cyan-500/10 text-[0.875em] rounded-md px-[0.4em] py-[0.3em] font-mono"
							>
								Ctrl + F
							</span>
							to search for a file.
						</div>
					</div>
				</div>
			{/if}

			{#if breadcrumbParts.length > 0}
				<div
					class="flex items-center justify-start gap-2 p-4 bg-neutral-800 rounded-xl mb-4"
				>
					<a href="/?prefix=" class="link" data-sveltekit-reload>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
							/>
						</svg>
					</a>
					<span class="text-neutral-400">/</span>
					{#each breadcrumbParts as part, i}
						{#if i === breadcrumbParts.length - 1}
							{part}
						{:else}
							<a
								href={`/?prefix=${encodeURIComponent(
									breadcrumbParts.slice(0, i + 1).join('/') + '/'
								)}`}
								class="link"
								data-sveltekit-reload>{part}</a
							>
						{/if}

						<span class="text-neutral-400">/</span>
					{/each}
				</div>
			{/if}

			<div class="text-neutral-400 mb-4 text-center">
				{#if folders.length > 1}
					<span class="font-mono">
						{new Intl.NumberFormat().format(folderCount)}
					</span>
					{folderCount === 1 ? 'directory' : 'directories'}
					and
				{/if}
				<span class="font-mono">
					{new Intl.NumberFormat().format(objects.length)}
				</span>
				{objects.length === 1 ? 'file' : 'files'}
			</div>
			<div class="overflow-hidden">
				<table class="min-w-full">
					<thead class="bg-primary">
						<tr>
							<th class="p-2">Name</th>
							<th class="p-2">Size</th>
						</tr>
					</thead>
					<tbody>
						{#each folders as folder}
							<TableRow>
								<td class="p-2 flex items-center justify-start gap-4">
									{#if folder.name === '..'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6 text-neutral-400"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
											/>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6 text-neutral-400"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
											/>
										</svg>
									{/if}

									<a href={folder.url} class="link" data-sveltekit-reload>
										{folder.name}
									</a>
								</td>
								<td />
							</TableRow>
						{/each}

						{#each objects as object}
							<TableRow>
								<td class="p-2 flex items-center justify-start gap-4">
									{#if object.name.endsWith('.zip')}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6 text-neutral-400"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
											/>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6 text-neutral-400"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
											/>
										</svg>
									{/if}
									<a href={object.url} class="link" rel="external">
										{object.name}
									</a>
								</td>
								<td class="text-center">{filesize(object.size).human('si')}</td>
							</TableRow>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</main>
