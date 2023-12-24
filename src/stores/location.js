import { defineStore } from 'pinia';
import axios from 'axios'; // Assuming you're using axios for API calls

export const useLocationStore = defineStore('location', {
  state: () => ({
    locations: [], // Optionally store locations here
  }),
  actions: {
    async createLocation(locationData) {
      try {
        const { data } = await axios.post('/api/v1/create', locationData);
        // Update the store state if needed
        this.locations.push(data);
      } catch (error) {
        throw error; // Re-throw the error to be handled in the component
      }
    },
  },
});