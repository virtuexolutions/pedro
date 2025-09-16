import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Header from '../Components/Header';
import PolicyComponent from '../Components/PolicyComponent';

const PrivacyPolicy = () => {
  const policyArray = [
    {
      id: 1,
      heading: 'Information We Collect',
      description:
        'We collect different types of information from service providers to operate and improve our platform.',
      subData: [
        {
          id: 'i1',
          heading: 'a. Information You Provide',
          texts: [
            'Account Information: Name, email, phone number, profile picture, business name, and payment/bank details.',
            'Service Details: Certifications, licenses, portfolio images, service descriptions, and availability schedule.',
            'Support Requests: Communications with customer support, feedback, and inquiries.',
          ],
        },
        {
          id: 'i2',
          heading: 'b. Information We Collect Automatically',
          texts: [
            'Location Data: GPS location when you are providing services or using location-based features.',
            'Device Information: IP address, operating system, app version, device identifiers, and browser type.',
            'Usage Data: Login times, service history, client interactions, and ratings/reviews.',
          ],
        },
        {
          id: 'i3',
          heading: 'c. Information from Third Parties',
          texts: [
            'Identity Verification: Background checks, licensing authority records.',
            'Payment Processors: Transaction confirmations and payout details.',
            'Referrals: Information from clients or partners who refer you.',
          ],
        },
      ],
      texts: [],
    },
    {
      id: 2,
      heading: 'How We Use Your Information',
      description: 'We use your data for the following purposes:',
      subData: [],
      texts: [
        'To connect you with clients who request your services.',
        'To process service bookings, payments, and payouts.',
        'To verify your identity and qualifications.',
        'To enhance safety and security on the platform.',
        'To provide customer support and resolve disputes.',
        'To comply with legal and regulatory obligations.',
        'To improve our app performance and service recommendations.',
      ],
    },
    {
      id: 3,
      heading: 'How We Share Your Information',
      description: 'We may share your information in the following situations:',
      subData: [
        {
          id: 't1',
          heading: 'a. With Clients',
          texts: [
            'Your name, profile photo, business name, service details, and ratings will be visible to clients.',
            'Location data may be shared during active service bookings.',
          ],
        },
        {
          id: 't2',
          heading: 'b. With Third-Party Service Providers',
          texts: [
            'We may share your data with payment processors, identity verification providers, and analytics services.',
          ],
        },
        {
          id: 't3',
          heading: 'c. For Legal Requirements',
          texts: [
            'We may disclose your data if required by law, court order, or government request.',
          ],
        },
        {
          id: 't4',
          heading: 'd. Business Transfers',
          texts: [
            'If our company is involved in a merger, acquisition, or sale, your information may be transferred.',
          ],
        },
      ],
      texts: [],
    },
    {
      id: 4,
      heading: 'Data Retention',
      description:
        'We retain your personal information for as long as it is necessary to:',
      subData: [],
      texts: [
        'Provide our services to you.',
        'Comply with legal, tax, and regulatory requirements.',
        'Resolve disputes and enforce agreements.',
      ],
      endText:
        'When no longer needed, we securely delete or anonymize the data.',
    },
    {
      id: 5,
      heading: 'Your Privacy Rights',
      description: 'Depending on your location, you may have rights such as:',
      subData: [],
      texts: [
        'Accessing the personal data we hold about you.',
        'Correcting inaccurate or outdated information.',
        'Requesting deletion of your data.',
        'Restricting or objecting to certain processing.',
        'Requesting a copy of your data (data portability).',
      ],
      endText: 'To exercise your rights, email us at [privacy@yourapp.com].',
    },
    {
      id: 6,
      heading: 'Cookies & Tracking Technologies',
      description: 'We use cookies and similar technologies to:',
      subData: [],
      texts: [
        'Keep you signed in.',
        'Remember your preferences.',
        'Analyze how you use our platform.',
      ],
      endText:
        'You can disable cookies in your device/browser settings, but some features may not work.',
    },
    {
      id: 7,
      heading: 'Security Measures',
      description:
        'We take steps to protect your personal information, including:',
      subData: [],
      texts: [
        'Encryption of sensitive data such as payments.',
        'Access controls to limit who can view your data.',
        'Regular monitoring for suspicious activities.',
      ],
      endText: 'No system is 100% secure, but we work to minimize risks.',
    },
    {
      id: 8,
      heading: 'Children’s Privacy',
      description:
        'This platform is not intended for individuals under 18. We do not knowingly collect data from minors. If discovered, we will delete it promptly.',
      subData: [],
      texts: [],
      endText: '',
    },
    {
      id: 9,
      heading: 'International Data Transfers',
      description:
        'If you use our services outside your country, your data may be transferred to countries with different privacy laws. We take steps to protect your data.',
      subData: [],
      texts: [],
      endText: '',
    },
    {
      id: 10,
      heading: 'Changes to This Policy',
      description:
        'We may update this Privacy Policy from time to time. If we make significant changes, we will notify you through the app or by email.',
      subData: [],
      texts: [],
      endText: '',
    },
  ];

  return (
    
        <ImageBackground source={require('../Assets/Images/bg2.png')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.2),
        }}>
          <Header
          showList
            title={'privacy Policy'}
            textstyle={{color: Color.white}}
            headerColor={['#FFFFFF00', '#FFFFFF00', '#FFFFFF00']}
          />
          <CustomText
            style={{
              marginTop: moderateScale(30, 0.3),
              marginHorizontal: moderateScale(10, 0.3),
              color: Color.white,
              textAlign: 'justify',
              fontSize: moderateScale(12, 0.6),
            }}>
            {
              'Pedro we respects the privacy of our service providers . This Privacy Policy explains how we collect, use, and protect your data when you use our service provider mobile application.'
            }
          </CustomText>
          {policyArray.map((item, index) => {
            return <PolicyComponent item={item} />;
          })}

          <View style={{height: windowHeight * 0.045}} />
      </ScrollView>
        </ImageBackground>
  
  );
};

export default PrivacyPolicy;

const styles = ScaledSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactContainer: {
    marginLeft: moderateScale(10, 0.2),
    marginTop: moderateScale(5, 0.2),
    flexDirection: 'row',
    gap: moderateScale(10, 0.2),
  },
});


