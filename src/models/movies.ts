import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
  index,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Movies {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  director!: string;

  @prop({ required: true })
  year!: string;

  @prop({ required: true })
  country!: string;

  @prop({ required: true })
  genre!: string;

  @prop({ default: false })
  watchlist?: boolean;

  @prop({ default: false })
  favorite?: boolean;

  @prop()
  overview?: string;

  @prop()
  popularity?: number;

  @prop()
  voteCount?: number
}

export const moviesModel = getModelForClass(Movies);
