import {
  LayoutSection,
  AnnouncementSection,
  ContentSection,
  FeaturesSection,
  ClipboardSection,
  RichtextSection,
} from './sections';

import { Content, ContactForm, FeatureTable, MediaCard, ShowcaseCard } from './atoms';
import StepsSection from './sections/steps.section';
import React from 'react';

const jsonSafeParse = (json: string, fallback: any) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return fallback;
  }
};

export const componentMapper = ({ component_name, ...props }) => {
  switch (component_name) {
    case 'layout-section': {
      const {
        background,
        backgroundImage,
        clipPath,
        color,
        components,
        gap,
        padding,
        paddingPosition,
        template,
        tabletTemplate,
        mobileTemplate,
        verticalAlign,
      } = props;
      return (
        <LayoutSection
          background={background}
          backgroundImage={backgroundImage?.[0] || undefined}
          clipPath={clipPath}
          color={color}
          gap={gap}
          padding={padding}
          paddingPosition={paddingPosition}
          template={template}
          tabletTemplate={tabletTemplate}
          mobileTemplate={mobileTemplate}
          verticalAlign={verticalAlign}
        >
          {dynamicMapper(components)}
        </LayoutSection>
      );
    }
    case 'clipboard-section': {
      const { content, text, successMessage } = props;
      return (
        <ClipboardSection text={text} successMessage={successMessage}>
          {content || ''}
        </ClipboardSection>
      );
    }
    case 'content-section': {
      const {
        title,
        titleVariant,
        titleFontSize,
        caption,
        description,
        image,
        imagePosition,
        primaryAction,
        secondaryAction,
        backgroundImage,
        clipPath,
        backgroundColor,
        color,
        checkList,
      } = props;
      return (
        <ContentSection
          title={title}
          titleVariant={titleVariant}
          titleFontSize={titleFontSize}
          caption={caption}
          description={description}
          image={image?.[0] || undefined}
          imagePosition={imagePosition}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          backgroundImage={backgroundImage}
          clipPath={clipPath}
          backgroundColor={backgroundColor}
          color={color}
          checkList={checkList}
        />
      );
    }
    case 'steps-section': {
      const { title, titleVariant, caption, steps } = props;
      return <StepsSection title={title} titleVariant={titleVariant} caption={caption} steps={steps} />;
    }
    case 'feature-section': {
      const { title, titleVariant, caption, description, backgroundImage, clipPath, backgroundColor, color, features } =
        props;
      return (
        <FeaturesSection
          title={title}
          titleVariant={titleVariant}
          caption={caption}
          description={description}
          features={features}
          backgroundImage={backgroundImage}
          clipPath={clipPath}
          backgroundColor={backgroundColor}
          color={color}
        />
      );
    }
    case 'announcement-section': {
      const { title, caption, appearance, primaryAction } = props;
      return (
        <AnnouncementSection title={title} caption={caption} appearance={appearance} primaryAction={primaryAction} />
      );
    }
    case 'richtext': {
      const { content, maxWidth } = props;
      return <RichtextSection content={content} maxWidth={maxWidth} />;
    }
    case 'content': {
      const {
        title,
        titleHtml,
        titleEl,
        caption,
        description,
        image,
        align,
        mobileAlign,
        primaryAction,
        secondaryAction,
      } = props;
      return (
        <Content
          title={title}
          titleHtml={titleHtml}
          titleEl={titleEl}
          caption={caption}
          description={description}
          image={image?.[0] || undefined}
          align={align}
          mobileAlign={mobileAlign}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      );
    }
    case 'contact-form': {
      const {
        email,
        firstName,
        lastName,
        companyName,
        companyType,
        companyTypeOptions,
        message,
        submitText,
        successMessage,
        errorMessage,
      } = props;
      return (
        <ContactForm
          email={email}
          firstName={firstName}
          lastName={lastName}
          companyName={companyName}
          companyType={companyType}
          companyTypeOptions={companyTypeOptions?.map(({ value }) => value || undefined).filter((i) => i)}
          message={message}
          submitText={submitText}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      );
    }
    case 'feature-table': {
      const { header, content, checkmarkText, minWidth } = props;
      return (
        <FeatureTable
          header={jsonSafeParse(header, [])}
          content={jsonSafeParse(content, [])}
          checkmarkText={checkmarkText}
          minWidth={Number.parseFloat(minWidth)}
        />
      );
    }
    case 'media-card': {
      const { title, description, image, avatar, appearance } = props;
      return (
        <MediaCard
          title={title}
          description={description}
          image={image?.[0] || undefined}
          avatar={avatar}
          appearance={appearance}
        />
      );
    }
    case 'showcase-card': {
      const { title, subtitle, image, link } = props;
      return <ShowcaseCard title={title} subtitle={subtitle} image={image?.[0] || undefined} link={link} />;
    }
    default:
      return <>{component_name} - Component Not Found!</>;
  }
};

export const dynamicMapper = (zone: any[]) => zone.map(componentMapper);
