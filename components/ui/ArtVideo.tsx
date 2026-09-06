'use client'

import { useMemo, useState, useEffect } from 'react'
import { AdvancedVideo } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { quality, format } from '@cloudinary/url-gen/actions/delivery'

interface ArtVideoProps {
  publicId: string
  cloudName: string
}

export default function ArtVideo({ publicId, cloudName }: ArtVideoProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  const cld = useMemo(
    () => new Cloudinary({ cloud: { cloudName } }),
    [cloudName]
  )

  const video = useMemo(() => {
    const v = cld.video(publicId)
    v.delivery(format('auto')).delivery(quality('auto'))
    return v
  }, [cld, publicId])

  const posterUrl = useMemo(() => {
    // Generate poster from video using video transformation to get a frame
    const posterVideo = cld.video(publicId)
    posterVideo
      .delivery(format('jpg')) // Convert video frame to JPG
      .delivery(quality('auto'))
      .addTransformation('so_0') // Extract frame at 0 seconds
    return posterVideo.toURL()
  }, [cld, publicId])

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-surface to-surface-hover rounded-lg" />
    )
  }

  return (
    <AdvancedVideo
      cldVid={video}
      controls={false}
      autoPlay
      loop
      muted
      playsInline
      poster={posterUrl}
      className="w-full h-full object-cover rounded-lg"
    />
  )
}
