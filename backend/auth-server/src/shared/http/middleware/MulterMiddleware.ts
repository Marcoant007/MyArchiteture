import { Request, Response, NextFunction } from 'express';
import Pino from 'src/shared/util/Pino';
import multer, { Multer, StorageEngine } from 'multer';
import { BaseMiddleware } from 'inversify-express-utils';

export class MulterMiddleware extends BaseMiddleware {

  private DIR = './tmp'
  private storage: StorageEngine;
  private upload: Multer;

  constructor() {
    super();
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.DIR);
      },
      filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('');
        let fileNewWithDate = new Date().getTime() + '_' + fileName;
        cb(null, fileNewWithDate);
      }
    });

    this.upload = multer({
      storage: this.storage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpe', 'image/jpg	', 'image/jpeg	', 'image/png' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'));
        }
      }
    });
  }

  public async handler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await new Promise((resolve, reject) => {
        this.upload.single('file')(req, res, (err: any) => {
          if (!req.file) {
            //return res.json({ error: "teste" });
            resolve(req);
          }
          console.log(typeof err);
          reject(err);
        });
      });

      next();

    } catch (error) {
      Pino.error(error);
    } finally {
      next();
    }
  }
}