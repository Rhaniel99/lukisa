import { useState, useEffect, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { Memory, Comment } from '@/Types/models';

type Props = {
  memory: Memory;
  initialComments: Comment[];
  initialPage: number;
  lastPage: number;
};

export function useCommentPagination({
  memory,
  initialComments,
  initialPage,
  lastPage,
}: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialPage < lastPage);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);

    router.reload({
      only: ['selectedMemoryDetails'],
      data: { memory_id: memory.id, comments_page: page + 1 },
      onSuccess: pageProps => {
          console.log('Resposta do Inertia:', pageProps);
        const props = pageProps.props as any;
        const detail = props.selectedMemoryDetails as any;
        // mesclar novos comentários no fim
        setComments(old => [...old, ...detail.comments]);
        setPage(detail.commentsCurrentPage);
        setHasMore(detail.commentsCurrentPage < detail.commentsLastPage);
        setLoading(false);
      },
    });
  }, [hasMore, loading, page, memory.id]);

  return { comments, loadMore, hasMore };
}
