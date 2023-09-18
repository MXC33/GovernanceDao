<template lang="pug">
div(flex="~ row" :w="isMobile ? 'full' : '1/2'")
  div(flex="~ col" align="left" space-y="2" m="t-8")
    div(flex="~ col grow")
      UserInfoDetail {{$t(`cosmetics.userInfo.aoc`)}}
      p(text="xl lg:2xl white" text-shadow="white") {{ user.name }}

      div(grid="~ cols-3 gap-1")
        div(grid="col-span-1" space-y="2")
          UserInfoDetail {{$t(`cosmetics.userInfo.memberSince`)}}
          p(text="sm white" text-shadow="white") {{ user.reginster_date }}
        div(grid="col-span-1" space-y="2")
          UserInfoDetail {{$t(`cosmetics.userInfo.status`)}}
          UserStatus(text="sm")
        div(grid="col-span-1" space-y="2") 
          UserInfoDetail {{$t(`cosmetics.userInfo.social`)}}
          div(flex="~ row" space-x="2" text="sm white" text-shadow="white")
            p {{ user.social_media.facebook }}
            p {{ user.social_media.twitter }}
            p {{ user.social_media.twitter }}

    div(flex="~ col grow")
      UserInfoDetail {{$t(`cosmetics.userInfo.pm`)}}
      p(mt="1" text="sm mc-orange" text-shadow="mc-orange" capitalize="~") “All-in is my 100% Winning Mindset on the path to Excellence. It starts with Belief. Let’s Go!”
    
</template>

<script setup lang="ts">
const { profileObj: user } = useUserData()
const isMobile = useMobileBreakpoint()
</script>