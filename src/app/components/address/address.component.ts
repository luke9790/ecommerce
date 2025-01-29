import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShippingAddress } from '../../interfaces/interfaces';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  @Input() address: ShippingAddress = this.getEmptyAddress(); // Permette di passare un indirizzo precompilato
  @Output() addressSaved = new EventEmitter<ShippingAddress>(); // Evento per inviare il nuovo indirizzo

  confirmAddress(): void {
    if (!this.isAddressValid(this.address)) {
      alert('Tutti i campi obbligatori devono essere compilati.');
      return;
    }

    this.addressSaved.emit(this.address); // Emissione dell'evento al parent
    this.address = this.getEmptyAddress(); // Reset del form dopo il salvataggio
  }

  isAddressValid(address: ShippingAddress): boolean {
    return (
      !!address.address_line1 &&
      !!address.city &&
      !!address.state &&
      !!address.postal_code &&
      !!address.country
    );
  }

  getEmptyAddress(): ShippingAddress {
    return {
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    };
  }
}
