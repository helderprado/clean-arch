export default class Address {
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  get number(): number {
    return this._number;
  }

  validate() {
    if (this._city.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Street is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Street is required");
    }
    if (this._city.length === 0) {
      throw new Error("Street is required");
    }
  }

  toString() {
    return `${this._city}, ${this._number}, ${this._street}, ${this._city}`;
  }
}
