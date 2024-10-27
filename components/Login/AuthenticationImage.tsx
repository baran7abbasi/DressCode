.body {
	background-color: black;
}

.wrapper {
	min-height: rem(750px);
	max-height: rem(750px);
	margin-bottom: -20px;
	width: 101.2%;
	height: rem(750px);
	background-size: cover;
	background-image: url(https://tr.rbxcdn.com/180DAY-f8f917ac708dba73d2dd322a78e7604d/768/432/Image/Webp/noFilter);
	overflow: hidden;
}

.form {
	border-right: rem(1px) solid
		light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-7));
	min-height: rem(750px);
	max-height: rem(750px);
	max-width: rem(450px);
	padding-top: rem(80px);
	background-color: black;

	@media (max-width: $mantine-breakpoint-sm) {
		max-width: 100%;
	}
	overflow: hidden;
	color: white;
}

.title {
	color: white;
	font-family:
		Greycliff CF,
		var(--mantine-font-family);
}

