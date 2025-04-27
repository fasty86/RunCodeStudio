import { NextFunction, Request, Response } from 'express'
import { Comment } from '../models/Comment'
import { User } from '../models/User'
import { Reaction } from '../models/Reaction'

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.postId)
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
        root_comment: null,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstname'], // Выбираем нужные поля
        },
        {
          model: Reaction,
          include: [
            {
              model: User,
              attributes: ['id', 'firstname'],
            },
          ],
        },
        {
          model: Comment,
          as: 'replies', // Включаем ответы
          include: [
            {
              model: User,
              attributes: ['id', 'firstname'],
            },
            {
              model: Reaction,
              include: [
                {
                  model: User,
                  attributes: ['id', 'firstname'],
                },
              ],
            },
            {
              model: Comment,
              as: 'replies', // Рекурсивно включаем ответы на ответы
              include: [User], // Можно продолжать вкладывать
            },
          ],
        },
      ],
    })

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}

export { getComments }
