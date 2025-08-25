'use client';

import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Security,
  CheckCircle,
  Info,
  Warning,
  Business,
  Phone,
  Email,
  LocationOn,
  Person,
} from '@mui/icons-material';
import { useTranslations } from '@/hooks/useTranslations';

export function PrivacyPolicyPage() {
  const { currentLang } = useTranslations();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.50' }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{ mb: 3 }}
          >
            {currentLang === 'bg'
              ? 'Политика за поверителност'
              : 'Privacy Policy'}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            textAlign="center"
            sx={{ opacity: 0.9 }}
          >
            {currentLang === 'bg'
              ? 'Защита на вашите лични данни и права'
              : 'Protection of your personal data and rights'}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Last Updated */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>
              {currentLang === 'bg'
                ? 'Последна актуализация:'
                : 'Last updated:'}
            </strong>{' '}
            {currentLang === 'bg' ? '19 август 2025 г.' : 'August 19, 2025'}
          </Typography>
        </Box>

        {/* Introduction */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '1. Въведение' : '1. Introduction'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Соф Кар Rental (наричана по-нататък "ние", "нашата компания" или "администраторът") се ангажира да защитава вашата поверителност и лични данни. Тази политика за поверителност обяснява как събираме, използваме, съхраняваме и защитаваме вашата лична информация при използването на нашия уебсайт и услугите ни за коли под наем.'
              : 'Sof Car Rental (hereinafter referred to as "we", "our company" or "the administrator") is committed to protecting your privacy and personal data. This privacy policy explains how we collect, use, store and protect your personal information when using our website and car rental services.'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Използването на нашия уебсайт и услугите означава, че сте съгласни с тази политика за поверителност.'
              : 'Using our website and services means you agree to this privacy policy.'}
          </Typography>
        </Paper>

        {/* Data Controller */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '2. Администратор на данните'
              : '2. Data Controller'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Business color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Име на компанията:'
                      : 'Company name:'}
                  </strong>
                }
                secondary="СОФ-КАР 2016 ЕООД"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>{currentLang === 'bg' ? 'ЕИК:' : 'EIC:'}</strong>
                }
                secondary="208062810"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Адрес:' : 'Address:'}
                  </strong>
                }
                secondary="Западна промишлена зона, Ямбол 8600, България"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Телефон:' : 'Phone:'}
                  </strong>
                }
                secondary="0879994212"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Email color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>{currentLang === 'bg' ? 'Имейл:' : 'Email:'}</strong>
                }
                secondary="2013anikar@gmail.com"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Person color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Управител:' : 'Manager:'}
                  </strong>
                }
                secondary="ГЕОРГИ АПОСТОЛОВ КРЪСТЕВ"
              />
            </ListItem>
          </List>
        </Paper>

        {/* Personal Data Collection */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '3. Какви лични данни събираме'
              : '3. What Personal Data We Collect'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Събираме следните видове лични данни:'
              : 'We collect the following types of personal data:'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Идентификационни данни:'
                      : 'Identification data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Име, фамилия, ЕГН'
                    : 'First name, last name, EGN'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Контактни данни:'
                      : 'Contact data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Телефонен номер, имейл адрес'
                    : 'Phone number, email address'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Данни за резервация:'
                      : 'Reservation data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Дати на наемане, клас автомобил, локация'
                    : 'Rental dates, car class, location'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Данни за плащане:'
                      : 'Payment data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Информация за кредитна карта (обработва се от Borica/UBB)'
                    : 'Credit card information (processed by Borica/UBB)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Технически данни:'
                      : 'Technical data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'IP адрес, тип браузър, операционна система'
                    : 'IP address, browser type, operating system'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Purpose of Data Processing */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '4. За какво използваме вашите данни'
              : '4. How We Use Your Data'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Вашите лични данни се използват за следните цели:'
              : 'Your personal data is used for the following purposes:'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Изпълнение на договор:'
                      : 'Contract execution:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Обработване на резервации, предоставяне на услуги'
                    : 'Processing reservations, providing services'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Комуникация:' : 'Communication:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Потвърждения, промоции, поддръжка'
                    : 'Confirmations, promotions, support'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Правни изисквания:'
                      : 'Legal requirements:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Съответствие с българското законодателство'
                    : 'Compliance with Bulgarian legislation'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Подобряване на услугите:'
                      : 'Service improvement:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Анализ и оптимизация'
                    : 'Analysis and optimization'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Сигурност:' : 'Security:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Защита срещу измами и злоупотреба'
                    : 'Protection against fraud and abuse'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Data Retention */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '5. За колко време съхраняваме данните'
              : '5. How Long We Store Data'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Вашите лични данни се съхраняват за периода, необходим за изпълнение на договорните отношения и за спазване на правните изисквания:'
              : 'Your personal data is stored for the period necessary to fulfill contractual relationships and comply with legal requirements:'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Данни за резервация:'
                      : 'Reservation data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? '5 години след изпълнение на договора'
                    : '5 years after contract execution'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Данни за плащане:'
                      : 'Payment data:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? '7 години (съгласно данъчното законодателство)'
                    : '7 years (according to tax legislation)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Технически данни:'
                      : 'Technical data:'}
                  </strong>
                }
                secondary={currentLang === 'bg' ? '1 година' : '1 year'}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Data Protection */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '6. Защита на данните'
              : '6. Data Protection'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Прилагаме подходящи технически и организационни мерки за защита на вашите лични данни:'
              : 'We implement appropriate technical and organizational measures to protect your personal data:'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Шифроване:' : 'Encryption:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'SSL/TLS защита за всички предавания'
                    : 'SSL/TLS protection for all transmissions'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Достъп:' : 'Access:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Ограничен достъп само за упълномощени лица'
                    : 'Limited access only for authorized persons'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Резервни копия:' : 'Backups:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Регулярни резервни копия с шифроване'
                    : 'Regular encrypted backups'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Your Rights */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '7. Вашите права' : '7. Your Rights'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Съгласно GDPR, имате следните права относно вашите лични данни:'
              : 'According to GDPR, you have the following rights regarding your personal data:'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Право на достъп:'
                      : 'Right of access:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Да знаете какви данни съхраняваме за вас'
                    : 'To know what data we store about you'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Право на поправяне:'
                      : 'Right to rectification:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Да поправите неточни данни'
                    : 'To correct inaccurate data'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Право на изтриване:'
                      : 'Right to erasure:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Да изтрием данните ви (при определени условия)'
                    : 'To delete your data (under certain conditions)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Право на ограничаване:'
                      : 'Right to restriction:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Да ограничим обработката на данните'
                    : 'To restrict data processing'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Contact Information */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '8. Контакти' : '8. Contact Information'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'За въпроси относно тази политика за поверителност или за упражняване на вашите права, моля свържете се с нас:'
              : 'For questions about this privacy policy or to exercise your rights, please contact us:'}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> 2013anikar@gmail.com
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Phone:</strong> +359 87 999 4212
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Address:</strong> Западна промишлена зона, Ямбол 8600,
              България
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
