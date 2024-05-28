<template>
	<header class="customer-header">

		<div class="logo-wrapper">
			<nuxt-link to="/dashboard">
				<svgo-logo filled class="logo" />
			</nuxt-link>
		</div>

		<div class="user-menu">

			<p class="menu-welcome">{{ user.nicename }}</p>

			<customer-avatar class="ms-2" :user="user" />

			<nav class="menu">
				<ul class="list-unstyled">
					<li>
						<nuxt-link to="/dashboard/me">Editar mi perfil</nuxt-link>
					</li>
					<li><a href="#" @click.prevent="logout">Cerrar sesión</a></li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>

	const { logout } = useAuth();
	const user = useAuthUser();
	const config = useRuntimeConfig();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.customer-header
		background: $brand1
		display: flex
		align-items: stretch
		position: sticky
		top: 0
		z-index: 1000

		.logo-wrapper
			padding: 0 1rem
			display: flex
			align-items: center

		.logo
			fill: white
			width: 100px
			height: auto

		.user-menu
			margin-left: auto
			padding: 1rem
			display: flex
			justify-content: flex-end
			align-items: center
			z-index: 100

			&:hover
				background: rgba(black, 0.5)

				.menu
					display: block

			.menu-welcome
				color: white
				margin: 0
				font-size: 1rem
				max-width: 120px
				white-space: nowrap
				overflow: hidden
				text-overflow: ellipsis

			.avatar
				width: 35px

			.menu
				display: none
				position: absolute
				top: 100%
				right: 0
				background: white
				border: 1px solid $gray-200
				width: 100%
				max-width: 300px

				ul
					margin: 0

					li
						margin: 0

						&:hover
							background: $gray-100

						a
							display: block
							padding: 0.5rem
							text-decoration: none
</style>