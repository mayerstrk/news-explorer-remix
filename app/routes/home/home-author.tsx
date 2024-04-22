import clsx from 'clsx'
import { useState } from 'react'

export default function HomeAuthor() {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center md:flex-row xl:justify-start', // display
        'mx-auto gap-[24px] px-[16px] pb-[128px] pt-[32px] md:gap-[32px] md:p-[40px] md:pt-[44px] xl:gap-[56px] xl:px-[104px] xl:py-[80px]', // spacing
        'max-w-[1440px] xl:h-auto', // dimensions
        { 'md:h-[354px]': isExpanded === false }, // conditional
      )}
    >
      <div
        className={clsx(
          'min-h-[272px] min-w-[272px] md:min-h-[232px] md:min-w-[232px] xl:min-h-[464px] xl:min-w-[464px]', // dimesions
          'bg-[url("/images/IMG_20231104_141259_716.jpg")]  bg-cover', // background
          'rounded-full', // effects.
        )}
      ></div>
      <div className='md flex max-w-[600px] flex-col gap-[16px] xl:gap-[35px] xl:self-start xl:pt-[51px]'>
        <h2
          className={clsx(
            'font-robotoSlab text-[30px] leading-[40px] md:h-[34px] xl:text-[40px] xl:leading-[46px]',
          )}
        >
          About me
        </h2>
        <div
          className={clsx(
            'relative flex flex-col gap-[24px] text-justify text-[18px]',
            {
              'max-h-[196px] overflow-y-hidden md:max-h-[168px]': !isExpanded,
              'md:overflow-hidden': true,
            },
          )}
        >
          <p className='text-[18px] leading-[24px]'>
            Hey 👋, I&apos;m Mayer, a full-stack developer 🚀. I lead a team of
            mobile and web developers in the Israeli Defence Forces.
          </p>
          <p className='text-[18px] leading-[24px]'>
            Our work involves understanding the specific processes of our
            organization and engineering systems that enhance and automate their
            workflows. We specialize in creating solutions that collect,
            analyze, and visualize data with the aim of improving
            decision-making.
          </p>
          <p className='text-[18px] leading-[24px]'>
            In addition to my development role, a significant part of my
            responsibilities involves studying our clients&apos; business
            processes to create BPDs and plan database infrastructure to make
            sure we implement the most appropriate technologies to our
            solutions. Moreover, I am actively involved in educating new
            recruits about our technology stack, ensuring they are well-equipped
            and knowledgeable for their roles after my departure.
          </p>
          <p className='text-[18px] leading-[24px]'>
            I am passionate about building and designing. Crafting apps that
            offer an incredible experience for both developers and users is
            something I find truly rewarding.
          </p>
          <p className='text-[18px] leading-[24px]'>
            I have a particular fondness for static types, especially Rust and
            TypeScript.
          </p>
          <p className='text-[18px] leading-[24px]'>
            Above all, I&apos;m a self-learner. I enjoy working on my personal
            projects and staying up to date with new technologies and frameworks
            - with htmx, SvelteKit, and Remix currently topping my list of
            interests.
          </p>
          {!isExpanded && (
            <div
              className={clsx(
                'absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-[#ffffff]',
              )}
            ></div>
          )}
        </div>

        <button
          className={clsx(
            'mt-4 text-[16px] font-medium',
            'text-[#B6BCBF] hover:text-gray-600',
          )}
          onClick={toggleExpansion}
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      </div>
    </section>
  )
}
