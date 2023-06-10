<script lang="ts">
  import { onMount } from 'svelte';
  import { SKILLS } from '../configs/skillConfig';
	import { skillStore } from '../stores/skillStore';
  import { getCurrentTimestamp } from '../util/util';
	import type { SkillType } from "../util/types";

  export let skillType: SkillType;

  let cooldown: number;

  onMount(async () => {
		setInterval(() => {
			const { timeSinceLastUsed } = $skillStore[skillType];
			const timeRemaining = timeSinceLastUsed + SKILLS[skillType]!.cooldown - getCurrentTimestamp();
			cooldown = Math.round(Math.max(timeRemaining, 0));
		}, 500)
	});
</script>

<button disabled={cooldown !== 0} on:click={() => SKILLS[skillType].onUse()}>
  Find resource {#if cooldown !== 0}{cooldown}{/if}
</button>