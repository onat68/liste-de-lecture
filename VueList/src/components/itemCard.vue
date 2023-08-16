<script setup>

import addButton from './addButton.vue';

</script>

<template>
  <div
    class="CardElement w-full h-[120px] bg-white rounded-s5 shadow flex-col justify-start items-start inline-flex"
  >
    <div class="Wrapper0 h-full self-stretch rounded-s5 justify-center items-start inline-flex">
      <div class="ImgWrapper w-fit h-fit flex">
        <img
          class="Jwposter1 h-[12Opx] w-20 aspect-auto rounded-tl-s5 rounded-bl-s5"
          src="../assets/jwposter.jpeg"
          alt="A poster, book or album cover or similar image related to the element displayed in the card"
        />
      </div>
      <section
        class="TextWrapper h-full w-full grow shrink basis-0 self-stretch pl-1 pr-2 py-1 rounded-s5 flex-col justify-start items-start inline-flex"
      >
        <section
          class="MainInfoWrapper h-min w-full flex-col self-stretch justify-between items-baseline inline-flex"
        >
          <div
            class="TitleTypeWrapper w-full h-min flex-row justify-between items-start inline-flex"
          >
            <h3 class="Title text-neutral-900 text-base font-bold leading-tight">
              John Wick: Chapter 4
            </h3>
            <p class="Type text-purple-500 text-base font-light leading-tight">Movie</p>
          </div>
          <div
            class="AuthorInfosWrapper w-full h-min text-neutral-900 font-normal flex flex-row justify-between"
          >
            <h4 class="Author text-xs font-medium leading-none h-min">Chad Stahelski</h4>
            <section
              class="InfosWrapper h-min flex-row wrap text-[10px] leading-none gap-0.5 inline-flex self-end"
            >
              <p class="Genre">Action/Crime</p>
              <p class="Dash">-</p>
              <p class="ReleaseYear">2023</p>
            </section>
          </div>
        </section>
        <section
          class="OverviewWrapper self-stretch grow shrink basis-0 pt-1 flex-col justify-start items-start gap-2.5 flex"
        >
          <p
            class="self-stretch h-full w-full grow shrink basis-0 text-neutral-900 text-[10px] font-extralight text-ellipsis truncate whitespace-normal"
          >
            With the price on his head ever increasing, John Wick uncovers a path to defeating The
            High Table. But before he can earn his freedom, Wick must face off against a new enemy
            with powerful alliances across the globe and forces that turn old friends into foes.
          </p>
        </section>
      </section>
      <addButton></addButton>
    </div>
  </div>
</template>
