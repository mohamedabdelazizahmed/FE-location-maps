<template>
  <v-container fluid>
    <v-toolbar title="Create a new Location"></v-toolbar>
    <v-card class="pa-4">
      <v-card-item>
        <v-theme-provider theme="light" with-background class="pa-2 rounded-b">
          <!-- <v-row>
      <v-col cols="12" md="6" offset-md="3"> -->
          <form @submit.prevent="onCreateMeetup">
            <v-row>
              <v-col col="12" md="6">
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="title"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="latitude"
                  label="latitude"
                  required
                  prepend-inner-icon="mdi-map-marker"
                  variant="solo"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="longitude"
                  label="longitude"
                  prepend-inner-icon="mdi-map-marker"
                  variant="solo"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn raised class="primary" @click="onPickFile"
                  >Upload Image</v-btn
                >
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                />
              </v-col>
              <v-col>
                <img :src="imageUrl" height="150" />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn
                  class="primary"
                  :disabled="!formIsValid"
                  type="submit"
                  color="primary"
                  >Create Location</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-theme-provider>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useLocationStore } from "../stores/location.js"; // Assuming your Pinia store is named "location"
const locationStore = useLocationStore();

let title = ref("");
let imageUrl = ref("");
let latitude = ref("");
let longitude = ref("");
let image = ref(null);

const onCreateLocation = async () => {
  if (!formIsValid) {
    return;
  }
  if (!image) {
    return;
  }
  const locationData = {
    title: title,
    image: image,
    latitude: latitude,
    longitude: longitude,
  };
  try {
    await locationStore.createLocation(locationData);

    this.$router.push("/meetups");
  } catch (error) {
    console.error("Error creating location:", error);
  }
};
const fileInput = ref(null);

const onPickFile = () => {
  fileInput.value.click();
};
const onFilePicked = (event) => {
  const files = event.target.files;
  let filename = files[0].name;
  if (filename.lastIndexOf(".") <= 0) {
    return alert("Please add a valid file!");
  }
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    imageUrl = fileReader.result;
    console.log(imageUrl);
  });
  // fileReader.onload = (e) => {
  //   imageUrl = e.target.result;
  //   console.log(imageUrl);
  // };
  fileReader.readAsDataURL(files[0]);
  image = files[0];
};

const formIsValid = computed(() => {
  return (
    title.value !== "" &&
    image.value !== "" &&
    latitude.value !== "" &&
    longitude.value !== ""
  );
});
</script>
