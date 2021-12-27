import React, { FC, useMemo } from 'react';
import {
  alpha,
  Box,
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { cleanObject } from '../../utils/object.utils';
import { Image, ImageProps } from '../atoms';

const StepRootStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'stretch'
  }
}));

export type StepProps = {
  title?: string;
  caption?: string;
  description?: string;
  image?: ImageProps;
  index?: number;
  primaryAction?: ButtonProps;
} & React.HTMLAttributes<HTMLDivElement>;

const Step: FC<StepProps> = (props) => {
  const { title = '', caption = '', description = '', image, primaryAction, index, children, ...rest } = props;

  const hasActions = useMemo(() => primaryAction, [primaryAction]);
  const theme = useTheme();

  return (
    <StepRootStyled {...rest}>
      {index !== undefined && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              display: 'flex',
              width: '1.75rem',
              height: '1.75rem',
              marginRight: theme.spacing(1),
              justifyContent: 'center',
              alignItems: 'center',
              flex: '0 0 auto',
              borderRadius: '100%',
            }}
          >
            <Typography color={'inherit'}>{index}</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              height: '1px',
              backgroundColor: theme.palette.primary.main,
            }}
          />
        </Box>
      )}
      {caption?.length > 0 && (
        <Typography variant="caption" color={'secondary'} gutterBottom>
          {caption}
        </Typography>
      )}
      {title?.length > 0 && (
        <Typography variant="h6" color={'primary'} gutterBottom>
          {title}
        </Typography>
      )}
      {description?.length > 0 && (
        <Typography variant={'body2'} gutterBottom>
          {description}
        </Typography>
      )}
      {hasActions && (
        <Button {...cleanObject(primaryAction)} sx={{
          marginBottom: theme.spacing(2),
          marginTop: theme.spacing(2),
        }}>
          {primaryAction?.title}
        </Button>
      )}
      {image && <Image {...image} size={100} />}
    </StepRootStyled>
  );
};

const StepsSectionRootStyled = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
}));

export type StepsSectionProps = {
  title?: string;
  caption?: string;
  steps?: StepProps[];
} & ContainerProps;

const StepsSection: FC<StepsSectionProps> = (props) => {
  const {
    title = '',
    caption = '',

    steps = [],
    maxWidth,
    ...rest
  } = props;

  const theme = useTheme();

  const innerTemplate = (steps || [])?.length > 3 ? 'repeat(3, 1fr)' : `repeat(${steps?.length}, 1fr)`;
  const innerTabletTemplate = (steps || [])?.length > 3 ? 'repeat(3, 1fr)' : `repeat(${steps?.length}, 1fr)`;
  const innerMobileTemplate = '1fr';

  return (
    <StepsSectionRootStyled>
      <Container {...rest} maxWidth={maxWidth}>
        <Box
          display="flex"
          sx={{
            flexDirection: 'column',
            position: 'relative',
            zIndex: 5,
            alignItems: 'flex-start',
            textAlign: 'initial',
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '1fr',
              flexDirection: 'column',
            },
            '& > *:not(:last-child)': {
              marginBottom: theme.spacing(4),
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            {caption && (
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  color: 'secondary.light',
                  fontWeight: 'bold',
                }}
                variant="body1"
                gutterBottom
              >
                {caption}
              </Typography>
            )}
            {title?.length > 0 && (
              <Typography gutterBottom variant={'h3'} dangerouslySetInnerHTML={{ __html: title }} />
            )}
          </Box>
          {steps?.length > 0 && (
            <Box
              sx={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: innerTemplate,
                [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: innerTabletTemplate,
                },
                [theme.breakpoints.down('sm')]: {
                  gridTemplateColumns: innerMobileTemplate,
                },
                gap: theme.spacing(2),
              }}
            >
              {steps.map((step, index) => {
                const { title, caption, description, primaryAction, image } = step;
                return (
                  <Step
                    key={`${title}_${index}`}
                    index={index + 1}
                    title={title}
                    caption={caption}
                    description={description}
                    primaryAction={primaryAction}
                    image={image?.[0] || undefined}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Container>
    </StepsSectionRootStyled>
  );
};

export default StepsSection;
