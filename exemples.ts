async onMapClick(event: google.maps.MapMouseEvent): Promise<void> {
  if (!event.latLng) return;

  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  this.clickedMarker = { lat, lng };

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode(
    { location: { lat, lng } },
    (results, status) => {
      if (status === 'OK' && results?.length) {
        this.clickedAddress = results[0].formatted_address;
      } else {
        this.clickedAddress = '';
      }

      this.searchAddress = this.clickedAddress || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

      this.insertForm = {
        adresse: this.searchAddress,
        latitude: lat,
        longitude: lng
      };

      this.showInsertForm = true;
    }
  );
}