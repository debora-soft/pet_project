import { File } from "../models/file";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export class FileService {
  async upload(req: Request, res: Response):Promise<File> {
    req.file?.path
    const fileData = await getRepository(File).save({
      name: req.file?.originalname,
      file_extension: req.file?.mimetype.split("/")[1],
      MIME_type: req.file?.mimetype,
      size: req.file?.size,
      path: req.file?.path,
    });
    return fileData;
  }
 async listFile():Promise<File[]>{
   const listFile = await getRepository(File).find({order: {createDate: "ASC"}});
   return listFile;
 }   
}
