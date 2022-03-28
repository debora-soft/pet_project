import { File } from "../models/file";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as fs from "fs";

export class FileService {
  async upload(req: Request, res: Response): Promise<File> {
    const fileData = await getRepository(File).save({
      name: req.file?.originalname,
      file_extension: req.file?.mimetype.split("/")[1],
      MIME_type: req.file?.mimetype,
      size: req.file?.size,
      path: req.file?.path,
    });
    return fileData;
  }
  async listFile(): Promise<File[]> {
    const listFile = await getRepository(File).find({
      order: { createDate: "ASC" },
    });
    return listFile;
  }
  async deleteFile(id: string, res: Response): Promise<void> {
    const deletedFile = await getRepository(File).findOne({ id });
    if (deletedFile) {
      fs.unlink(deletedFile.path, async (err) => {
        if (err) {
          console.log(err);
          res.json(err);
          res.end();
        } else {
          await getRepository(File).delete({ id });
          const delFile = await getRepository(File).findOne({ id });
          if (delFile) {
            res.json("could not delete file information from the database");
            res.end();
          } else {
            res.status(200);
            res.end();
          }
        }
      });
    }
  }
  async updateFile(id: string, req: Request, res: Response): Promise<void> {
    const udatedFile = await getRepository(File).findOne({ id });
    if (udatedFile) {
      fs.unlink(udatedFile.path, async (err) => {
        if (err) {
          res.json(err);
          res.end();
        } else {
          await getRepository(File).update(
            { id: udatedFile.id },
            {
              name: req.file?.originalname,
              file_extension: req.file?.mimetype.split("/")[1],
              MIME_type: req.file?.mimetype,
              size: req.file?.size,
              path: req.file?.path,
            }
          );
          const newFile: File | undefined = await getRepository(File).findOne({
            id: udatedFile.id,
          });
          if (newFile) {
            res.json(File);
            res.end();
          } else {
            res.status(400).json("the updated file could not be found");
          }
        }
      });
    }
  }
  async fileInfo(id: string, req: Request, res: Response) {
    const fileInfo: File | undefined = await getRepository(File).findOne({
      id,
    });
    if (fileInfo) {
      res.status(200).json(fileInfo);
      res.end();
    } else {
      res.status(400).json("file not found");
    }
  }
  async getFile(id: string, req: Request, res: Response) {
    const file: File | undefined = await getRepository(File).findOne({
      id,
    });
    if (file) {
      if (fs.existsSync(file.path)) {
        res.download(file.path);
      } else {
        res.status(400).json("file not found");
      }
    } else {
      res.status(400).json("file not found");
    }
  }
}
