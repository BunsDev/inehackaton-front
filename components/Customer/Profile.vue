<template>
	<div class="profile">
		<platform-loading
			:active="saveLoading"
			:is-full-page="false"
		/>
		<div class="container d-flex flex-grow-1 flex-column">
			<p>Edita tu perfil utilizando el formulario a continuación:</p>

			<div class="d-flex flex-column flex-sm-row gap-sm-5">
				<div class="flex-shrink-1">
					<div class="me-avatar">
						<div class="avatar-wrapper">
							<platform-file-upload
								ref="customerAvatarRef"
								accept="image/jpeg,image/png"
								@update="uploadAvatar"
								capture="user"
								:is-loading="avatarLoading"
								class="mb-3"
							>
								<platform-attachment class="avatar" :id="profile.idAvatar" v-if="profile.idAvatar" />
								<customer-avatar v-else :user="profile" :size="150" />
							</platform-file-upload>

							<div class="edit-avatar">
								<icon name="line-md:edit" />
							</div>
						</div>
					</div>
				</div>
				<div class="flex-grow-1">
					<div class="mb-3">
						<input
							type="text"
							id="nicename"
							v-model="profile.nicename"
							class="form-control form-control-nicename"
						/>
						<small class="form-text text-muted">Este es tu apodo dentro de CertifAI</small>
					</div>

					<h3 class="profile-title">Datos personales</h3>

					<!-- field for firstname -->
					<div class="form-group mb-3">
						<label class="form-label" for="firstname">Nombre(s)</label>
						<input type="text" id="firstname" v-model="profile.firstname" class="form-control" />
						<small class="form-text text-muted">Por favor introduce todos tus nombres</small>
					</div>

					<div class="row">
						<div class="col-6">
							<!-- field for lastname -->
							<div class="form-group mb-3">
								<label class="form-label" for="lastname">Apellido Paterno</label>
								<input type="text" id="lastname" v-model="profile.lastname" class="form-control" />
							</div>
						</div>
						<div class="col-6">
							<!-- field for lastname -->
							<div class="form-group mb-3">
								<label class="form-label" for="secondLastname">Apellido Materno</label>
								<input
									type="text"
									id="secondLastname"
									v-model="profile.secondLastname"
									class="form-control"
								/>
							</div>
						</div>
					</div>

					<!-- field for fecha de nacimiento -->
					<div class="form-group mb-3">
						<label class="form-label" for="birthdate">Fecha de nacimiento</label>
						<input type="date" id="birthdate" v-model="profile.dob" class="form-control" />
					</div>

					<!-- field for RFC -->
					<div class="form-group mb-3">
						<label class="form-label" for="rfc">RFC</label>
						<input type="text" id="rfc" v-model="profile.rfc" class="form-control" />
					</div>
				</div>
			</div>

			<p class="text-end cta-container mt-auto">
				<button
					class="btn btn-light"
					:disabled="saveLoading"
					@click="saveProfile"
				>Guardar cambios
				</button>
			</p>
		</div>
	</div>
</template>

<script setup>
	const user = useAuthUser();
	const { calculateRFC } = useRFC();
	const { errorToast, successToast } = usePrettyToast();

	const avatarLoading = ref(false);
	const customerAvatarRef = ref(null);
	const saveLoading = ref(false);

	const profile = ref({
		id: user.value.id,
		nicename: user.value.nicename,
		firstname: user.value.firstname,
		lastname: user.value.lastname,
		dob: user.value.metas?.dob || '',
		secondLastname: user.value.metas?.secondLastname || '',
		rfc: user.value.metas.rfc,
	});

	const uploadAvatar = async (files) => {

		avatarLoading.value = true;

		if(files.length) {
			// Create new form data
			const formData = new FormData();
			formData.append('file', files[0]);
			// Call upload api endpoint
			const { data, error } = await useBaseFetch('/upload', {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			profile.value.idAvatar = data.value.data.attachment.id;
		}

		avatarLoading.value = false;
		customerAvatarRef.value.resetFiles();
	};

	// watch firstname, lastname, secondLastname, dob
	watch(profile, () => {
		profile.value.rfc = calculateRFC(profile.value);
	}, { deep: true });

	const saveProfile = async () => {

		saveLoading.value = true;

		console.log(profile.value.id);

		const { error } = await useBaseFetch(`/users/${ profile.value.id }/profile`, {
			method: 'PUT',
			body: profile.value,
		});

		console.log('error', error.value);

		if(error.value) {
			errorToast('No se pudo guardar tu perfil, por favor intenta de nuevo');
		} else {
			successToast('Perfil actualizado correctamente');
		}

		saveLoading.value = false;
	};

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.profile
		padding-top: 1rem

	.form-control-nicename
		border-radius: 0
		border: none
		text-align: center
		font-size: 1.5rem
		border-bottom: 1px solid var(--bs-border-color)

		@media (min-width: $sm)
			text-align: left

	.profile-title
		font-size: 0.75rem
		text-transform: uppercase
		letter-spacing: 1px
		padding-bottom: 0.5rem
		color: $brand1
		border-bottom: 1px solid var(--bs-border-color)

	.me-avatar

		.avatar-wrapper
			width: 100px
			display: block
			margin: 0 auto
			aspect-ratio: 1

			.edit-avatar
				pointer-events: none
				position: absolute
				right: 0
				bottom: 0
				border-radius: 50%
				background: $brand1
				color: white
				aspect-ratio: 1
				width: 2rem
				display: flex
				justify-content: center
				align-items: center

			@media (min-width: $sm)
				width: 150px

			.avatar
				border-radius: 50%
				object-fit: cover
				width: 100%
				height: auto
				aspect-ratio: 1
				box-shadow: 0 0 10px rgba(black, 0.1)


	.cta-container
		background: $brand1
		border-radius: 0.5rem
		padding: 0.5rem
		position: sticky
		bottom: 1rem
</style>