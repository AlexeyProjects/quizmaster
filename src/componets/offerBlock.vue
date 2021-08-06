<template>
	<div class="offerblock">


		<div class="offerblock-image" >

		</div>


		<div class="offerblock-content" >
			Предложение
		</div>


		<svg v-show="STEP_COUNTER < DATAMAIN.lenght + 1" width="2.5rem" height="2.5rem" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10.5" cy="10.5" r="9.5" fill="#719BAD" stroke="white" stroke-width="2"/>
			<g clip-path="url(#clip0)">
				<path d="M13.0312 8.87499H12.75V7.74999C12.75 6.50912 11.7409 5.49999 10.5 5.49999C9.25912 5.49999 8.25 6.50912 8.25 7.74999V8.87499H7.96875C7.50375 8.87499 7.125 9.25337 7.125 9.71874V13.6562C7.125 14.1216 7.50375 14.5 7.96875 14.5H13.0312C13.4962 14.5 13.875 14.1216 13.875 13.6562V9.71874C13.875 9.25337 13.4962 8.87499 13.0312 8.87499ZM9 7.74999C9 6.92274 9.67275 6.24999 10.5 6.24999C11.3272 6.24999 12 6.92274 12 7.74999V8.87499H9V7.74999ZM10.875 11.7707V12.625C10.875 12.832 10.7074 13 10.5 13C10.2926 13 10.125 12.832 10.125 12.625V11.7707C9.90187 11.6406 9.75 11.4014 9.75 11.125C9.75 10.7114 10.0864 10.375 10.5 10.375C10.9136 10.375 11.25 10.7114 11.25 11.125C11.25 11.4014 11.0981 11.6406 10.875 11.7707Z" fill="white"/>
			</g>
			<defs>
			<clipPath id="clip0">
			<rect width="9" height="9" fill="white" transform="translate(6 5.5)"/>
			</clipPath>
			</defs>
		</svg>

	</div>
</template>

<style lang="scss" >
	.offerblock {
		position: relative;
		text-decoration: none;
		display: flex;
		width: 22.2rem;
		border: 1px solid #A6DCFB;
		position: relative;
		box-shadow: inset 0px 0px 10px -3px rgba(0, 0, 0, 0.05);
		border-radius: 3px;
		&-image {
			width: 6.7rem;
			height: 6rem;
			background: linear-gradient(93.6deg, #A6DCFB 1.47%, rgba(166, 220, 251, 0) 183.3%);
		}
		&-content {
			width: 15rem;
			font-weight: 700;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		svg {
			position: absolute;
			right: -1rem;
			top: -1rem;
		}
	}

</style>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data: function() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['DATAMAIN', 'STEP_COUNTER'])
		}
	}
</script>