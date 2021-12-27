import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import axios from 'axios';

export type ContactFormProps = {
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companyType?: string;
  companyTypeOptions?: string[];
  message?: string;
  successMessage?: string;
  errorMessage?: string;
  submitText?: string;
} & React.HTMLAttributes<HTMLFormElement>;

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const {
    email = 'E-mail',
    firstName = 'First Name',
    lastName = 'Last Name',
    companyName = 'Company Name',
    companyType = 'Company Type',
    message = 'Message',
    successMessage = "Successfully submitted! We'll get back to you within 2 business days.",
    errorMessage = 'Oops! An errors has occurred!',
    submitText = 'Submit',
    companyTypeOptions = ['Enterprise (over 250 employees)', 'Start-up (less than 250 employees)', 'Agency', 'Other'],
    ...rest
  } = props;

  const validator = useMemo(
    () =>
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        companyName: z.string().min(1),
        companyType: z.enum(companyTypeOptions as any),
        message: z.string().min(1),
      }),
    [companyTypeOptions]
  );

  const theme = useTheme();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(validator),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
      companyType: '',
      message: '',
    },
  });

  const submit = handleSubmit(async (data) => {
    await axios.post(`${process.env.NEXT_PUBLIC_CMS_URL}/api/contact`, data);
    setHasSubmitted(true);
  });

  return (
    <form onSubmit={submit} {...rest}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={email}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            type="text"
            {...register('email')}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            label={firstName}
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message}
            type="text"
            {...register('firstName')}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            label={lastName}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            type="text"
            {...register('lastName')}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            label={companyName}
            error={!!errors?.companyName}
            helperText={errors?.companyName?.message}
            type="text"
            {...register('companyName')}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <InputLabel error={!!errors?.companyType}>Company Type</InputLabel>
            <Select label={companyType} error={!!errors?.companyType} {...register('companyType')}>
              {companyTypeOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {(errors?.companyType?.message || '').length > 0 && (
            <FormHelperText error>{errors?.companyType?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            fullWidth
            error={!!errors?.message}
            helperText={errors?.message?.message}
            minRows={4}
            label={message}
            {...register('message')}
          />
        </Grid>
      </Grid>
      {hasSubmitted &&
        (isSubmitSuccessful ? (
          <Alert sx={{ mt: theme.spacing(2) }} severity="success">
            {successMessage}
          </Alert>
        ) : (
          <Alert sx={{ mt: theme.spacing(2) }} severity="error">
            {errorMessage}
          </Alert>
        ))}
      <Button
        disabled={isSubmitSuccessful || isSubmitting}
        sx={{ mt: theme.spacing(2), display: 'block', ml: 'auto' }}
        variant={'contained'}
        color="primary"
        type="submit"
      >
        {submitText}
      </Button>
    </form>
  );
};

export default ContactForm;
