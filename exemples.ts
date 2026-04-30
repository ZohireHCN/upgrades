<div #autocompleteContainer class="autocomplete-container"></div>

@ViewChild('autocompleteContainer', { static: false })
autocompleteContainer!: ElementRef<HTMLDivElement>;

ngAfterViewInit(): void {
  const autocomplete = new google.maps.places.PlaceAutocompleteElement();

  this.autocompleteContainer.nativeElement.appendChild(autocomplete);

  autocomplete.addEventListener('gmp-select', async (event: any) => {
    const place = event.placePrediction.toPlace();

    await place.fetchFields({
      fields: ['displayName', 'formattedAddress', 'location']
    });

    if (!place.location) return;

    const lat = place.location.lat();
    const lng = place.location.lng();

    this.selectedAddressMarker = { lat, lng };
    this.center = { lat, lng };
    this.zoom = 16;

    this.searchAddress = place.formattedAddress || place.displayName || '';

    this.insertForm = {
      adresse: this.searchAddress,
      latitude: lat,
      longitude: lng
    };

    this.showInsertForm = true;
  });

  this.loadStudies();
}

.autocomplete-container {
  width: 420px;
}

.autocomplete-container gmp-place-autocomplete {
  width: 100%;
}
