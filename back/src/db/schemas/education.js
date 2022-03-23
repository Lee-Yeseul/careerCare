/*
  학력 정보 스키마,
  데이터 {user id, 학교, 전공, 학위}

  2022/03/16
  김보현

*/
import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    //isPrivate : true면 해당 도큐먼트 비공개 설정
    isPrivate: {
      type: Boolean,
      default : false,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
