import React from 'react'
import BlogDetailsSkeleton from "@/components/skeleton/public/BlogDetailsSkeleton"
import Container from '@/components/shared/Container'

const loading = () => {
  return (
    <Container>
      <BlogDetailsSkeleton></BlogDetailsSkeleton>
    </Container>
  )
}

export default loading
