export interface Product {
  id : String | undefined;
  description : String;
  title : String;
  price : Number;
  image : String;
  sold : Number;
  unique : Number;
}

export interface StatsDate{
  totalPrice: Number;
  dateString: String;
  dateNumber: Number;
}
