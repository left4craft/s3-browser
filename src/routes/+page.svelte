<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import filesize from 'file-size';
	import TableRow from '../components/TableRow.svelte';
	console.log(data);
	const { folders, objects } = data;
</script>

<svelte:head>
	<title>Left4Craft: Downloads</title>
</svelte:head>

<main>
	<div class="m-2 p-4 sm:p-8">
		<h1 class="text-2xl md:text-4xl font-bold mb-8">Left4Craft Downloads</h1>
		<p class="text-lg">
			This page allows you to browse Left4Craft's archives,
			primarily for the old worlds.
			 For more information about downloading old worlds, see
			<a href="https://wiki.left4craft.org/old-worlds/" class="link">the wiki page</a>.
		</p>
	</div>
	<div class="flex flex-col">
		<div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
			<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
												class="w-6 h-6 text-neutral-400 "
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
												/>
											</svg>
										{/if}

										<a href={folder.url} class="link">
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
										<a href={object.url} class="link" download>
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
	</div>
</main>
