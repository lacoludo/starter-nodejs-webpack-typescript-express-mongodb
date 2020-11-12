import fs from 'fs'
import { Request, Response } from 'express'

import ThingModel from './thing.model'

export const readThings = async (req: Request, res: Response) => {
  await ThingModel.find()
    .then(things => {
      res.status(200).json(things)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

export const createThing = async (req: Request, res: Response) => {
  req.body.thing = JSON.parse(req.body.thing)
  const url = req.protocol + '://' + req.get('host')
  const thing = new ThingModel({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  })
  await thing
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

export const readThing = async (req: Request, res: Response) => {
  await ThingModel.findOne({
    _id: req.params.id
  })
    .then(thing => {
      res.status(200).json(thing)
    })
    .catch(error => {
      res.status(404).json({
        error: error
      })
    })
}

export const updateThing = async (req: Request, res: Response) => {
  let thing: any = new ThingModel({ _id: req.params._id })
  if (req.file) {
    const url = req.protocol + '://' + req.get('host')
    req.body.thing = JSON.parse(req.body.thing)
    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    }
  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    }
  }
  await ThingModel.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

export const deleteThing = async (req: Request, res: Response) => {
  await ThingModel.findOne({ _id: req.params.id }).then((thing: any) => {
    const filename = thing.imageUrl.split('/images/')[1]
    fs.unlink('images/' + filename, () => {
      ThingModel.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: 'Deleted!'
          })
        })
        .catch(error => {
          res.status(400).json({
            error: error
          })
        })
    })
  })
}
