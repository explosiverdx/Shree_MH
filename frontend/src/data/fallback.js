export const fallbackDepartments = [
  {
    _id: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    description: "Bone, joint, fracture, arthritis, sports injury, and trauma care from experienced orthopedic specialists."
  },
  {
    _id: "joint-replacement",
    name: "Joint Replacement",
    icon: "Activity",
    description: "Knee, hip, and shoulder replacement planning with modern surgical care and recovery support."
  },
  {
    _id: "spine-care",
    name: "Spine Care",
    icon: "Stethoscope",
    description: "Back pain, neck pain, disc problems, posture concerns, and spine rehabilitation care."
  },
  {
    _id: "emergency-trauma",
    name: "Emergency & Trauma",
    icon: "HeartPulse",
    description: "24/7 emergency response for fractures, accidents, pain, trauma, and urgent multispeciality support."
  }
];

export const fallbackDoctors = [
  {
    _id: "d1",
    name: "Dr. Rajesh Sharma",
    department: "Orthopedics",
    specialization: "Senior Orthopedic Surgeon",
    experience: 18,
    qualification: "MS Ortho",
    fee: 120,
    availableDays: ["Monday", "Wednesday", "Friday"]
  },
  {
    _id: "d2",
    name: "Dr. Meera Patel",
    department: "Joint Replacement",
    specialization: "Joint Replacement Specialist",
    experience: 14,
    qualification: "MS Ortho, Fellowship Arthroplasty",
    fee: 95,
    availableDays: ["Tuesday", "Thursday", "Saturday"]
  },
  {
    _id: "d3",
    name: "Dr. Amit Verma",
    department: "Spine Care",
    specialization: "Spine and Trauma Consultant",
    experience: 16,
    qualification: "MS Ortho, Spine Fellowship",
    fee: 130,
    availableDays: ["Monday", "Tuesday", "Thursday"]
  }
];

const departmentTranslations = {
  EN: {
    Cardiology: {
      name: "Orthopedics",
      description: "Bone, joint, fracture, arthritis, sports injury, and trauma care from experienced orthopedic specialists."
    },
    "Emergency Care": {
      name: "Emergency & Trauma",
      description: "24/7 emergency response for fractures, accidents, pain, trauma, and urgent multispeciality support."
    },
    Neurology: {
      name: "Spine Care",
      description: "Back pain, neck pain, disc problems, posture concerns, and spine rehabilitation care."
    },
    "Mother & Child": {
      name: "Rehabilitation",
      description: "Physiotherapy, mobility training, post-surgery recovery, and guided rehabilitation programs."
    },
    Orthopedics: {
      name: "Orthopedics",
      description: "Bone, joint, fracture, arthritis, sports injury, and trauma care from experienced orthopedic specialists."
    },
    "Joint Replacement": {
      name: "Joint Replacement",
      description: "Knee, hip, and shoulder replacement planning with modern surgical care and recovery support."
    },
    "Spine Care": {
      name: "Spine Care",
      description: "Back pain, neck pain, disc problems, posture concerns, and spine rehabilitation care."
    },
    "Emergency & Trauma": {
      name: "Emergency & Trauma",
      description: "24/7 emergency response for fractures, accidents, pain, trauma, and urgent multispeciality support."
    },
    "Sports Injury": {
      name: "Sports Injury",
      description: "Care for ligament injuries, sprains, shoulder injuries, knee injuries, and sports rehabilitation."
    },
    "Physiotherapy & Rehabilitation": {
      name: "Physiotherapy & Rehabilitation",
      description: "Physiotherapy, mobility training, post-surgery recovery, and guided rehabilitation programs."
    }
  },
  HI: {
    Cardiology: {
      name: "ऑर्थोपेडिक्स",
      description: "हड्डी, जोड़, फ्रैक्चर, गठिया, खेल चोट और ट्रॉमा की अनुभवी ऑर्थोपेडिक विशेषज्ञों द्वारा देखभाल।"
    },
    "Emergency Care": {
      name: "इमरजेंसी और ट्रॉमा",
      description: "फ्रैक्चर, दुर्घटना, दर्द, चोट और तुरंत मल्टीस्पेशलिटी सहायता के लिए 24/7 आपातकालीन देखभाल।"
    },
    Neurology: {
      name: "रीढ़ की देखभाल",
      description: "कमर दर्द, गर्दन दर्द, डिस्क समस्या, पोस्चर और रीढ़ की पुनर्वास देखभाल।"
    },
    "Mother & Child": {
      name: "पुनर्वास",
      description: "फिजियोथेरेपी, चलने-फिरने का प्रशिक्षण, ऑपरेशन के बाद रिकवरी और निर्देशित पुनर्वास कार्यक्रम।"
    },
    Orthopedics: {
      name: "ऑर्थोपेडिक्स",
      description: "हड्डी, जोड़, फ्रैक्चर, गठिया, खेल चोट और ट्रॉमा की अनुभवी ऑर्थोपेडिक विशेषज्ञों द्वारा देखभाल।"
    },
    "Joint Replacement": {
      name: "जॉइंट रिप्लेसमेंट",
      description: "घुटना, कूल्हा और कंधे के जॉइंट रिप्लेसमेंट की आधुनिक सर्जिकल देखभाल और रिकवरी सहायता।"
    },
    "Spine Care": {
      name: "रीढ़ की देखभाल",
      description: "कमर दर्द, गर्दन दर्द, डिस्क समस्या, पोस्चर और रीढ़ की पुनर्वास देखभाल।"
    },
    "Emergency & Trauma": {
      name: "इमरजेंसी और ट्रॉमा",
      description: "फ्रैक्चर, दुर्घटना, दर्द, चोट और तुरंत मल्टीस्पेशलिटी सहायता के लिए 24/7 आपातकालीन देखभाल।"
    },
    "Sports Injury": {
      name: "खेल चोट",
      description: "लिगामेंट चोट, मोच, कंधे की चोट, घुटने की चोट और खेल पुनर्वास की देखभाल।"
    },
    "Physiotherapy & Rehabilitation": {
      name: "फिजियोथेरेपी और पुनर्वास",
      description: "फिजियोथेरेपी, चलने-फिरने का प्रशिक्षण, ऑपरेशन के बाद रिकवरी और निर्देशित पुनर्वास कार्यक्रम।"
    }
  }
};

const doctorTranslations = {
  HI: {
    "Cardiology": "ऑर्थोपेडिक्स",
    "Emergency Care": "इमरजेंसी और ट्रॉमा",
    "Neurology": "रीढ़ की देखभाल",
    "Orthopedics": "ऑर्थोपेडिक्स",
    "Joint Replacement": "जॉइंट रिप्लेसमेंट",
    "Spine Care": "रीढ़ की देखभाल",
    "Emergency & Trauma": "इमरजेंसी और ट्रॉमा",
    "Sports Injury": "खेल चोट",
    "Physiotherapy & Rehabilitation": "फिजियोथेरेपी और पुनर्वास",
    "Senior Orthopedic Surgeon": "वरिष्ठ ऑर्थोपेडिक सर्जन",
    "Joint Replacement Specialist": "जॉइंट रिप्लेसमेंट विशेषज्ञ",
    "Spine and Trauma Consultant": "रीढ़ और ट्रॉमा सलाहकार",
    "Emergency & Trauma Specialist": "इमरजेंसी और ट्रॉमा विशेषज्ञ",
    "Sports Injury Specialist": "खेल चोट विशेषज्ञ",
    "Physiotherapy and Rehabilitation Specialist": "फिजियोथेरेपी और पुनर्वास विशेषज्ञ",
    "Chief Cardiologist": "वरिष्ठ ऑर्थोपेडिक सर्जन",
    "Emergency Medicine Lead": "इमरजेंसी और ट्रॉमा विशेषज्ञ",
    "Senior Neurologist": "रीढ़ और ट्रॉमा सलाहकार"
  },
  EN: {
    Cardiology: "Orthopedics",
    "Emergency Care": "Emergency & Trauma",
    Neurology: "Spine Care",
    "Chief Cardiologist": "Senior Orthopedic Surgeon",
    "Emergency Medicine Lead": "Emergency & Trauma Specialist",
    "Senior Neurologist": "Spine and Trauma Consultant"
  }
};

export function getDepartmentCopy(department, language) {
  return departmentTranslations[language]?.[department.name] || departmentTranslations.EN[department.name] || department;
}

export function getDoctorDepartment(department, language) {
  return doctorTranslations[language]?.[department] || doctorTranslations.EN[department] || department;
}

export function getDoctorSpecialization(specialization, language) {
  return doctorTranslations[language]?.[specialization] || doctorTranslations.EN[specialization] || specialization;
}
