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

    const newPost = await db.post.create({
        data: {
            title: "TETETTE",
            authorId: user.id
        },
    })


    return res.status(200).json({ data: newPost })
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