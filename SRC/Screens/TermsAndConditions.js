import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
// import Color from '../Assets/Utilities/Color';
// import Header from '../Components/Header';
import Header from '../Components/Header';
import PolicyComponent from '../Components/PolicyComponent';

const PrivacyPolicy = () => {
  // const navigation = useNavigation();
  const termsArray = [
    {
      id: 1,
      heading: 'Acceptance of Terms',
      description:
        'By registering as a service provider and using our platform, you agree to be bound by these Terms & Conditions.',
      subData: [],
      texts: [
        'If you do not agree with any part of these terms, you may not use our services.',
        'We may update these terms from time to time, and your continued use constitutes acceptance of changes.',
      ],
    },
    {
      id: 2,
      heading: 'Eligibility',
      description:
        'To become a service provider, you must meet the following requirements:',
      subData: [],
      texts: [
        'Be at least 18 years old.',
        'Possess any required licenses, permits, or certifications for the services you offer.',
        'Provide accurate, complete, and up-to-date registration information.',
      ],
    },
    {
      id: 3,
      heading: 'Service Provider Responsibilities',
      description:
        'You agree to provide your services professionally and in compliance with applicable laws.',
      subData: [],
      texts: [
        'Arrive on time for scheduled bookings.',
        'Maintain the necessary equipment and tools for your service.',
        'Treat clients respectfully and avoid misconduct.',
        'Ensure safety during service delivery.',
      ],
    },
    {
      id: 4,
      heading: 'Platform Usage Rules',
      description:
        'You agree not to use the platform in ways that may cause harm or violate laws.',
      subData: [],
      texts: [
        'No fraudulent or deceptive practices.',
        'No sharing of another user’s personal information without consent.',
        'No posting false service descriptions or misleading prices.',
      ],
    },
    {
      id: 5,
      heading: 'Payments & Fees',
      description:
        'We facilitate payments between you and clients through our secure payment system.',
      subData: [],
      texts: [
        'Service fees and commission rates will be displayed before booking.',
        'You agree to pay applicable platform fees from each transaction.',
        'We reserve the right to withhold payments in case of disputes, fraud, or violations.',
      ],
    },
    {
      id: 6,
      heading: 'Cancellations & No-Shows',
      description:
        'You must follow our cancellation policy to ensure fair treatment for clients.',
      subData: [],
      texts: [
        'Frequent cancellations or no-shows may lead to account suspension.',
        'Late arrivals may result in reduced payment or penalties.',
      ],
    },
    {
      id: 7,
      heading: 'Ratings & Reviews',
      description:
        'Clients may leave ratings and reviews based on their service experience.',
      subData: [],
      texts: [
        'You agree not to manipulate or fake reviews.',
        'We may remove reviews that violate our policies.',
      ],
    },
    {
      id: 8,
      heading: 'Account Suspension & Termination',
      description:
        'We may suspend or terminate your account if you violate these terms.',
      subData: [],
      texts: [
        'Reasons may include fraud, unsafe conduct, repeated complaints, or illegal activities.',
        'Suspension decisions are final and may not be reversed in certain cases.',
      ],
    },
    {
      id: 9,
      heading: 'Intellectual Property',
      description:
        'Our platform, branding, and content are protected by copyright and trademark laws.',
      subData: [],
      texts: [
        'You may not copy, modify, or distribute our content without permission.',
      ],
    },
    {
      id: 10,
      heading: 'Limitation of Liability',
      description:
        'We are not responsible for any loss, damage, or injury resulting from your service delivery.',
      subData: [],
      texts: [
        'You are solely responsible for the quality and safety of your services.',
        'We act only as a platform to connect you with clients.',
      ],
    },
    {
      id: 11,
      heading: 'Indemnification',
      description:
        'You agree to indemnify and hold harmless our company from any claims arising from your use of the platform or services.',
      subData: [],
      texts: [],
    },
    {
      id: 12,
      heading: 'Governing Law',
      description:
        'These Terms & Conditions are governed by the laws of your operating country or region.',
      subData: [],
      texts: [],
    },
    // {
    //   id: 13,
    //   heading: 'Contact Information',
    //   description:
    //     'If you have any questions regarding these terms, contact us at:',
    //   subData: [],
    //   texts: [
    //     'Your Company Name',
    //     'Your Company Address',
    //     'support@yourapp.com',
    //   ],
    // },
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
          title={'terms & conditons'}
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
            'IMPORTANT NOTICE: These Terms & Conditions (“Terms”) govern your use of the FACILIT8 mobile application, website, and services (collectively, the “Platform”). By accessing, downloading, registering, or using FACILIT8, you agree to these Terms. If you do not agree, you may not access or use our Platform.'
          }
        </CustomText>
        {termsArray.map((item, index) => {
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
