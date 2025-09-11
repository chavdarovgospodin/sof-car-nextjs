'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Info,
  Warning,
  Cancel,
  Security,
  Payment,
} from '@mui/icons-material';
import { TermsConditionsDialogProps } from './TermsConditionsDialog.types';
import { styles } from './TermsConditionsDialog.styles';
import {
  getTermsContent,
  getAgeRequirements,
  getRequiredDocuments,
  getPaymentTerms,
  getCancellationPolicy,
  getInsuranceCoverage,
  getImportantNotes,
} from './TermsConditionsDialog.const';

export function TermsConditionsDialog({
  open,
  onClose,
  lang,
}: TermsConditionsDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isEnglish = lang === 'en';

  const content = getTermsContent(isEnglish);
  const ageRequirements = getAgeRequirements(isEnglish);
  const requiredDocuments = getRequiredDocuments(isEnglish);
  const paymentTerms = getPaymentTerms(isEnglish);
  const cancellationPolicy = getCancellationPolicy(isEnglish);
  const insuranceCoverage = getInsuranceCoverage(isEnglish);
  const importantNotes = getImportantNotes(isEnglish);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? false : 'md'}
      fullWidth
      fullScreen={isMobile}
      disableScrollLock={true}
      keepMounted={false}
      PaperProps={{
        sx: {
          maxHeight: isMobile ? '100vh' : '90vh',
          margin: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : undefined,
        },
      }}
    >
      <DialogContent dividers>
        <Box sx={styles.dialogContent}>
          {/* General Terms */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {content.generalTitle}
          </Typography>
          <Typography variant="body2" paragraph>
            {content.generalDescription}
          </Typography>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {content.ageRequirementsTitle}
          </Typography>
          <List dense>
            {ageRequirements.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {content.requiredDocumentsTitle}
          </Typography>
          <List dense>
            {requiredDocuments.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Info color="info" />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider sx={styles.divider} />

          {/* Payment Terms */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {content.paymentTitle}
          </Typography>
          <List dense>
            {paymentTerms.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index === 0 ? (
                    <Payment color="primary" />
                  ) : index === 1 ? (
                    <Security color="warning" />
                  ) : (
                    <Info color="info" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider sx={styles.divider} />

          {/* Cancellation Policy */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {content.cancellationTitle}
          </Typography>
          <List dense>
            {cancellationPolicy.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index === 0 ? (
                    <CheckCircle color="success" />
                  ) : index === 1 ? (
                    <Warning color="warning" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider sx={styles.divider} />

          {/* Insurance */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {content.insuranceTitle}
          </Typography>
          <Typography variant="body2" paragraph>
            {content.insuranceDescription}
          </Typography>
          <List dense>
            {insuranceCoverage.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index === 2 ? (
                    <Warning color="warning" />
                  ) : (
                    <CheckCircle color="success" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider sx={styles.divider} />

          {/* Important Notes */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {content.importantNotesTitle}
          </Typography>
          <List dense>
            {importantNotes.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index === 2 ? (
                    <Info color="info" />
                  ) : (
                    <Warning color="warning" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} variant="contained" color="primary">
          {content.closeButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
