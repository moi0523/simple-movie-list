import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoriesProviderWrapper } from '@stories/ProviderWrapper';
import { Link } from '@component/atoms/link';
import { useStyletron } from 'styletron-react';

export default {
  title: 'Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const LinkTemplate: ComponentStory<typeof Link> = (args) => {
  const [css] = useStyletron();

  return (
    <StoriesProviderWrapper>
      <Link {...args}>
        <span
          className={css({
            fontSize: '14px',
            lineHeight: '21px',
            color: '#333333',
          })}
        >
          github link
        </span>
      </Link>
    </StoriesProviderWrapper>
  );
};

export const LinkStory = LinkTemplate.bind({});
LinkStory.args = {
  overrides: {
    Root: {
      style: {
        textDecoration: 'unset',
        color: '#333333',
      },
    },
  },
  href: 'https://github.com',
  target: '_blank',
};
