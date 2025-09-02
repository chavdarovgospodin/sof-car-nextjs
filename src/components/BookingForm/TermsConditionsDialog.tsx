'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
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
} from '@mui/material';
import {
  CheckCircle,
  Info,
  Warning,
  Cancel,
  LocalShipping,
  Security,
  Payment,
} from '@mui/icons-material';

interface TermsConditionsDialogProps {
  open: boolean;
  onClose: () => void;
  lang: string;
}

export function TermsConditionsDialog({
  open,
  onClose,
  lang,
}: TermsConditionsDialogProps) {
  const isEnglish = lang === 'en';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: '90vh' },
      }}
    >
      <DialogTitle>
        <Typography variant="h2" component="h2">
          {isEnglish ? 'Terms & Conditions' : 'Общи условия и политики'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>
            {isEnglish ? 'Last updated:' : 'Последна актуализация:'}
          </strong>{' '}
          {isEnglish ? 'August 19, 2025' : '19 август 2025 г.'}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ pb: 2 }}>
          {/* General Terms */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ mt: 2, mb: 2 }}
          >
            {isEnglish
              ? '1. General Rental Terms'
              : '1. Общи условия за наемане'}
          </Typography>
          <Typography variant="body2" paragraph>
            {isEnglish
              ? 'Car rental from Sof Car Rental is governed by the following general terms:'
              : 'Наемането на автомобили от Соф Кар Rental се регулира от следните общи условия:'}
          </Typography>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 2 }}
          >
            {isEnglish ? '1.1. Age Requirements' : '1.1. Възрастови изисквания'}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Minimum age: 21 years for economy and standard cars'
                    : 'Минимална възраст: 21 години за икономични и стандартни автомобили'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Minimum age: 25 years for premium cars'
                    : 'Минимална възраст: 25 години за премиум автомобили'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Valid driving license for at least 2 years'
                    : 'Валиден шофьорски удостоверение от поне 2 години'
                }
              />
            </ListItem>
          </List>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 2 }}
          >
            {isEnglish
              ? '1.2. Required Documents'
              : '1.2. Необходими документи'}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Valid driving license'
                    : 'Валиден шофьорски удостоверение'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Identity card or passport'
                    : 'Лична карта или паспорт'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Credit card for deposit'
                    : 'Кредитна карта за депозит'
                }
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />

          {/* Payment Terms */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ mt: 2, mb: 2 }}
          >
            {isEnglish ? '2. Payment Terms' : '2. Условия за плащане'}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Payment color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Payment is made in advance for the entire rental period'
                    : 'Плащането се извършва предварително за целия период на наемане'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Security deposit is required (blocked on credit card)'
                    : 'Изисква се депозит за сигурност (блокиран на кредитна карта)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Deposit is released within 7-14 days after car return'
                    : 'Депозитът се освобождава в рамките на 7-14 дни след връщане на автомобила'
                }
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />

          {/* Cancellation Policy */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ mt: 2, mb: 2 }}
          >
            {isEnglish ? '3. Cancellation Policy' : '3. Политика за отказ'}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Free cancellation up to 24 hours before rental start'
                    : 'Безплатен отказ до 24 часа преди началото на наемане'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? '50% charge for cancellation within 24 hours'
                    : '50% такса за отказ в рамките на 24 часа'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'No refund for no-show or same-day cancellation'
                    : 'Няма възстановяване при неявяване или отказ в същия ден'
                }
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />

          {/* Insurance */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ mt: 2, mb: 2 }}
          >
            {isEnglish
              ? '4. Insurance Coverage'
              : '4. Застрахователно покритие'}
          </Typography>
          <Typography variant="body2" paragraph>
            {isEnglish
              ? 'All our vehicles are covered by comprehensive insurance:'
              : 'Всички наши автомобили са покрити с пълна застраховка:'}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Third-party liability insurance (mandatory)'
                    : 'Застраховка за гражданска отговорност (задължителна)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Comprehensive insurance (theft, fire, damage)'
                    : 'Пълна застраховка (кражба, пожар, щети)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Excess amount applies in case of damage'
                    : 'Прилага се франшиза в случай на щети'
                }
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />

          {/* Important Notes */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ mt: 2, mb: 2 }}
          >
            {isEnglish ? '5. Important Notes' : '5. Важни забележки'}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Smoking is strictly prohibited in all vehicles'
                    : 'Пушенето е строго забранено във всички автомобили'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Pets are not allowed in vehicles'
                    : 'Домашните любимци не са разрешени в автомобилите'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  isEnglish
                    ? 'Vehicle must be returned with the same fuel level'
                    : 'Автомобилът трябва да бъде върнат със същото ниво на гориво'
                }
              />
            </ListItem>
          </List>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          {isEnglish ? 'Close' : 'Затвори'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
