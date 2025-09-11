'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Lock,
  Security,
  CreditCard,
  Nature,
} from '@mui/icons-material';
import { APP_CONFIG } from '@/utils/constants';
import { useTranslations } from '@/hooks/useTranslations';
import { styles } from './Footer.styles';
import { getFooterTexts, getSocialLinks, getFooterLinks } from './Footer.const';

export function Footer() {
  const { currentLang } = useTranslations();
  const currentYear = new Date().getFullYear();
  const texts = getFooterTexts(currentLang);
  const socialLinks = getSocialLinks();
  const footerLinks = getFooterLinks(currentLang);

  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="lg" sx={styles.container}>
        <Grid container spacing={4} sx={styles.grid}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={styles.companyTitle}>
              {APP_CONFIG.name}
            </Typography>
            <Typography variant="body2" paragraph>
              {texts.companyDescription}
            </Typography>

            {/* Contact Info */}
            <Box sx={styles.contactItem}>
              <Phone sx={styles.contactIcon} />
              <Link
                href={`tel:${APP_CONFIG.phone}`}
                color="inherit"
                underline="hover"
              >
                {APP_CONFIG.phone}
              </Link>
            </Box>

            <Box sx={styles.contactItem}>
              <Email sx={styles.contactIcon} />
              <Link
                href={`mailto:${APP_CONFIG.email}`}
                color="inherit"
                underline="hover"
              >
                {APP_CONFIG.email}
              </Link>
            </Box>

            <Box sx={styles.contactItem}>
              <LocationOn sx={styles.contactIcon} />
              <Typography variant="body2">{APP_CONFIG.address}</Typography>
            </Box>
          </Grid>

          {/* Social Media & Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={styles.socialTitle}>
              {texts.connectWithUs}
            </Typography>

            {/* Social Media Icons */}
            <Box sx={styles.socialIcons}>
              {socialLinks.map((socialLink, index) => (
                <IconButton
                  key={index}
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={
                    socialLink.href.includes('viber')
                      ? styles.viberButton
                      : styles.socialButton
                  }
                >
                  {socialLink.icon}
                </IconButton>
              ))}
            </Box>

            {/* Business Hours */}
            <Typography variant="body2" paragraph>
              <strong>{texts.businessHours}</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              {texts.weekdays}
            </Typography>
            <Typography variant="body2">{texts.saturday}</Typography>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box sx={styles.bottomBar}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={styles.bottomGrid}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={styles.copyright}>
                © {currentYear} <strong>Sof Car Rental</strong>.{' '}
                {texts.allRightsReserved}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={styles.linksContainer}>
                {footerLinks.map((footerLink) => (
                  <Link
                    key={footerLink.href}
                    href={footerLink.href}
                    color="grey.400"
                    underline="hover"
                    sx={styles.footerLink}
                  >
                    {footerLink.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Typography variant="body2" sx={styles.designerText}>
                {texts.designedBy}{' '}
                <Link
                  href="https://www.linkedin.com/in/gospodin-chavdarov-ab2435158/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="grey.400"
                  underline="hover"
                  sx={styles.designerLink}
                >
                  Gospodin Chavdarov
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Payment Methods Section */}
      <Box sx={styles.paymentSection}>
        <Container maxWidth="lg">
          <Box sx={styles.paymentContainer}>
            {/* SSL/Security Badge */}
            <Box sx={styles.sslBadge}>
              <Lock sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">SSL</Typography>
            </Box>

            {/* Eco/Safe Badge */}
            <Box sx={styles.ecoBadge}>
              <Nature sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">SAFE</Typography>
            </Box>

            {/* Payment Cards */}
            <Box sx={styles.paymentCard}>
              <CreditCard sx={{ ...styles.cardIcon, color: '#1a1f71' }} />
              <Typography variant="caption" sx={styles.cardText}>
                VISA
              </Typography>
            </Box>

            <Box sx={styles.paymentCard}>
              <CreditCard sx={{ ...styles.cardIcon, color: '#eb001b' }} />
              <Typography variant="caption" sx={styles.cardText}>
                MASTERCARD
              </Typography>
            </Box>

            {/* 3DS Protection */}
            <Box sx={styles.securityBadge}>
              <Security sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">3DS2 PROTECTED</Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            sx={styles.paymentText}
          >
            {texts.securePayments}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
