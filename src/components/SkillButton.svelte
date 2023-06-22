<script lang="ts">
  import { onMount } from 'svelte';
  import { SKILLS } from '../configs/skillConfig';
	import { skillStore } from '../stores/skillStore';
  import { getCurrentTimestamp, getRelativeTime } from '../util/util';
	import type { SkillType } from "../util/types";
	import Button from './UI/Button.svelte';

  export let skillType: SkillType;

  let cooldown: number;
	let cooldownString: string;

  onMount(async () => {
		setInterval(() => {
			const { timeSinceLastUsed } = $skillStore[skillType];
			const timeRemaining = timeSinceLastUsed + SKILLS[skillType]!.cooldown - getCurrentTimestamp();
			cooldownString = getRelativeTime(new Date(), new Date(timeSinceLastUsed * 1000))
			cooldown = Math.round(Math.max(timeRemaining, 0));
		}, 500)
	});
</script>

<Button disabled={cooldown !== 0} on:click={() => SKILLS[skillType].onUse()}>
  <span>Find resource</span>
	{#if cooldown !== 0}
		<span>({cooldownString})</span>
	{/if}
</Button>