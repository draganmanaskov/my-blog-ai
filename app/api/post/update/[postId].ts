import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {query} = req

  console.log(req.body.body.title)

  if(!query.postId) {
    return res.status(400).json({ data: null, error: "Post must have id" })
  }

  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    ) 

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized to perform this action.',
        createdApiKey: null,
      })
    }

    const updatedPost = await db.post.update(
      {
        where: { id: query.postId as string},
        data: {
          title: req.body.body.title,
          content: req.body.body.content
        }
      }
    )
      // console.log(updatedPost)

    return res.status(200).json({ data: updatedPost })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, data: null })
    }

    return res
      .status(500)
      .json({ error: 'Internal Server Error', data: null })
  }
}

export default handler;