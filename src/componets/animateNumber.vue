<template>
	<span>{{displayValue}}</span>
</template>

<style>
	
</style>

<script>
	import gsap from 'gsap';

	export default {
		props: {
			'value': {
		        default: 0
		    },
		},
		data: function() {
			return {
				displayValue: this.value,
	      		tweenValue: this.value
			}
		},
		watch: {
		    value() {
		      gsap.to(this, {
		        tweenValue: this.value,
		        onUpdate: () => {
		          this.displayValue = Math.ceil(this.tweenValue);
		        }
		      });
		    }
		}
	}
	
</script>