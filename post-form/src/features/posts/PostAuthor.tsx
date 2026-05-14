import { useAppSelector } from '@/app/hooks'

interface PostAuthorProps {
  userId: string
  showPrefix?: boolean
}

export const PostAuthor = ({ userId, showPrefix = true }: PostAuthorProps) => {
  return (
    <span>
      {showPrefix ? 'by ' : null}
      {userId ?? 'Unknown author'}
    </span>
  )
}
