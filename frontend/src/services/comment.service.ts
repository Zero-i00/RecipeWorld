import type { TypeCommentFormState } from '@/types/comment.types'
import { IComment } from '@/types/comment.types'

import { axiosWithAuth } from '@/api/interceptors'

class CommentService {
	private BASE_URL = '/comments'

	async getCommentById(id: number) {
		return await axiosWithAuth.get<IComment>(`${this.BASE_URL}/${id}`)
	}

	async createComment(data: TypeCommentFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateComment(id: number, data: TypeCommentFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteComment(id: number) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const commentService = new CommentService()
