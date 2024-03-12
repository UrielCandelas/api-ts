export interface RegisterTaks {
  title: string;
  description: string;
  date: Date;
}

export interface JSONTask extends RegisterTaks {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
