<template>
	<div class="consultant">
			<consultantText 
			class="consultant-text"
			v-for="(item,key,index) in DATAMAIN"
			:itemdata="item"
			:index="key"
			>
				
			</consultantText>
		<div class="consultant-woman">
			<img :src="CONSULTANT.image"  class="consultant-woman__image">
				
			<div class="consultant-woman-title">
				<div class="consultant-woman-title__name">
					{{ CONSULTANT.name }}
				</div>
				<div class="consultant-woman-title__status">
					{{ CONSULTANT.status }}
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.consultant {
		position: relative;
		width: 100%;
		&-text {
			position: absolute;
			bottom: 17rem;
			left: 0;
			background-color: #fff;
			border-radius: .3rem;
			padding: 1rem;
			box-sizing: border-box;
			width: 22.2rem;
			filter: drop-shadow(0px 0px 1px rgba(20, 20, 20, 0.04)) drop-shadow(0px 0px 8px rgba(20, 20, 20, 0.08));
			&::before {
				position:absolute;
				background-color: #fff;
				left:3rem;
				content: "";
				width: 1rem;
				height: 1rem;
				background: #fff;
				bottom: -.5rem;
				transform: rotateZ(45deg);

			}
		}

		&-woman {
			&__image {
				margin-bottom: 1.5rem;
			}
			&-title {
				&__name {
					font-weight: 700;
				}
			}
		}
	}
</style>

<script>
	import { mapGetters } from 'vuex'
	import consultantText from '@/componets/consultantText';

	export default {

		components: {
			consultantText
		},
		data: function() {
			return {
				data: ""
			}
		},
		computed: {
			...mapGetters(['CONSULTANT','DATAMAIN'])
		},
		mounted() {

		} 
	}
	
</script>