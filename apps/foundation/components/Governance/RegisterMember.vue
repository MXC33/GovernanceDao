<template lang="pug">
ButtonGlitch(btn="~ primary-outline-cut" @click="registerAsMember"  :text="'Join Dao'")

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDaoFunctions } from "./Web3/Dao"; // Adjust the path accordingly

export default defineComponent({
  name: "YourComponentName", // Replace with your component name

  setup() {
    const { registerMember } = useDaoFunctions();

    const registerAsMember = async () => {
      try {
        await registerMember();
        // Handle successful registration (e.g., update UI, show notification)
      } catch (error) {
        console.error("Error during registration:", error);
        // Handle errors (e.g., show error message to the user)
      }
    };

    return {
      registerAsMember,
    };
  },
});
</script>
