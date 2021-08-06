<template>
	<div class="progress">
		<div class="progress-content">
			<div class="progress-content__text">
				Готово
			</div>
			<div class="progress-content__procent">
				<animateNumber :value="progress"></animateNumber> %
			</div>
		</div>
		<div class="progress-bar">
			<div :style="getWidth" class="progress-bar__submit">
				
			</div>
		</div>
	</div>
</template>

<script>

	import animateNumber from "@/componets/animateNumber";

	export default {
		props: {
			'progress': {
				default: 0
			},
			'text': {
				default: ''
			}
		},
		components: {
			animateNumber
		},
		computed: {
			getWidth: function() {
				return `width: ${this.progress}%`
			}
		},
		data: function() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.progress {
		width: 100%;
		&-content {
			display: flex;
			&__text {
				color: #7C7C7C;
				margin-right: .5rem;
			}
			&__procent {
				color: #39AFF3;
				font-weight: 600;
			}
		}
		&-bar {
			border-radius: 10px;	
			position: relative;
			width: 100%;
			height: .5rem;
			background-color: rgb(238, 238, 238);
			margin-top:1rem;
			&__submit {
				transition: all 0.5s ease 0s;
				position: absolute;
				background-color: rgba(51, 153, 204, 0.5);
				height: 100%;
			}
		}
	}
</style>

