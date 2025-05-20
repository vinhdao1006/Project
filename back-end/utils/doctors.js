const doctors = [
  {
    "firstname": "Lindsey",
    "lastname": "Fields",
    "email": "lindsey.fields@example.com",
    "phone": "111-431-4630",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Emergency Department",
    "consultationFee": 220,
    "experience": "21 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Laura",
    "lastname": "Rodriguez",
    "email": "laura.rodriguez@example.com",
    "phone": "+1-165-961-5313x9982",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Emergency Department",
    "consultationFee": 150,
    "experience": "17 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Emily",
    "lastname": "Jones",
    "email": "emily.jones@example.com",
    "phone": "001-176-162-5215x895",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Cardiology",
    "consultationFee": 194,
    "experience": "22 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Robert",
    "lastname": "Koch",
    "email": "robert.koch@example.com",
    "phone": "376.742.8251x359",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Cardiology",
    "consultationFee": 227,
    "experience": "19 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Vickie",
    "lastname": "Martinez",
    "email": "vickie.martinez@example.com",
    "phone": "404.298.0067",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Neurology",
    "consultationFee": 238,
    "experience": "17 years",
    "languages": [
      "Spanish"
    ],
    "title": "Prof.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Denise",
    "lastname": "Collier",
    "email": "denise.collier@example.com",
    "phone": "+1-054-087-7390x2501",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Neurology",
    "consultationFee": 222,
    "experience": "19 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Traci",
    "lastname": "Green",
    "email": "traci.green@example.com",
    "phone": "887.453.3114x19435",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Pediatrics",
    "consultationFee": 165,
    "experience": "17 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Monica",
    "lastname": "Jordan",
    "email": "monica.jordan@example.com",
    "phone": "533-305-0916x83151",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Pediatrics",
    "consultationFee": 223,
    "experience": "16 years",
    "languages": [
      "French"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Edward",
    "lastname": "Fuller",
    "email": "edward.fuller@example.com",
    "phone": "(483)698-5694x79747",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Obstetrics and Gynaecology",
    "consultationFee": 104,
    "experience": "11 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Kelsey",
    "lastname": "Davis",
    "email": "kelsey.davis@example.com",
    "phone": "468.605.6038",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Obstetrics and Gynaecology",
    "consultationFee": 229,
    "experience": "25 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "MD",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jodi",
    "lastname": "Martinez",
    "email": "jodi.martinez@example.com",
    "phone": "9615555766",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Oncology",
    "consultationFee": 181,
    "experience": "14 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Pamela",
    "lastname": "Williams",
    "email": "pamela.williams@example.com",
    "phone": "0949395554",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Oncology",
    "consultationFee": 258,
    "experience": "7 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Amanda",
    "lastname": "Mendoza",
    "email": "amanda.mendoza@example.com",
    "phone": "001-367-583-8936x13304",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Orthopaedics",
    "consultationFee": 140,
    "experience": "8 years",
    "languages": [
      "French"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Todd",
    "lastname": "Tanner",
    "email": "todd.tanner@example.com",
    "phone": "(294)655-0661",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Orthopaedics",
    "consultationFee": 206,
    "experience": "12 years",
    "languages": [
      "French"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Heather",
    "lastname": "Harrison",
    "email": "heather.harrison@example.com",
    "phone": "137-118-8975",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Radiology",
    "consultationFee": 142,
    "experience": "29 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Prof.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Dalton",
    "lastname": "Gill",
    "email": "dalton.gill@example.com",
    "phone": "2912461740",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Radiology",
    "consultationFee": 279,
    "experience": "10 years",
    "languages": [
      "French"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Crystal",
    "lastname": "Crosby",
    "email": "crystal.crosby@example.com",
    "phone": "342-764-6600x0209",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Pathology",
    "consultationFee": 186,
    "experience": "6 years",
    "languages": [
      "German"
    ],
    "title": "Prof.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Benjamin",
    "lastname": "Dyer",
    "email": "benjamin.dyer@example.com",
    "phone": "9564371453",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Pathology",
    "consultationFee": 199,
    "experience": "30 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Kevin",
    "lastname": "Lee",
    "email": "kevin.lee@example.com",
    "phone": "079.165.5070",
    "password": "password123",
    "role": "Doctor",
    "specialty": "General Surgery",
    "consultationFee": 293,
    "experience": "13 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Stephanie",
    "lastname": "Fitzgerald",
    "email": "stephanie.fitzgerald@example.com",
    "phone": "001-644-930-1519x9899",
    "password": "password123",
    "role": "Doctor",
    "specialty": "General Surgery",
    "consultationFee": 222,
    "experience": "11 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jennifer",
    "lastname": "Freeman",
    "email": "jennifer.freeman@example.com",
    "phone": "019.856.8277",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Urology",
    "consultationFee": 266,
    "experience": "13 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "MD",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Alan",
    "lastname": "Lopez",
    "email": "alan.lopez@example.com",
    "phone": "+1-260-677-1543x401",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Urology",
    "consultationFee": 268,
    "experience": "9 years",
    "languages": [
      "English"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Sara",
    "lastname": "Daniel",
    "email": "sara.daniel@example.com",
    "phone": "292.200.0991x2834",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Dermatology",
    "consultationFee": 248,
    "experience": "8 years",
    "languages": [
      "English"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Joshua",
    "lastname": "Chang",
    "email": "joshua.chang@example.com",
    "phone": "001-302-540-5301x83857",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Dermatology",
    "consultationFee": 164,
    "experience": "5 years",
    "languages": [
      "French"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jessica",
    "lastname": "Wilkins",
    "email": "jessica.wilkins@example.com",
    "phone": "+1-681-911-1714x298",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Gastroenterology",
    "consultationFee": 241,
    "experience": "22 years",
    "languages": [
      "Spanish"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Erin",
    "lastname": "Bailey",
    "email": "erin.bailey@example.com",
    "phone": "001-756-900-9614x55892",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Gastroenterology",
    "consultationFee": 267,
    "experience": "19 years",
    "languages": [
      "German"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jeff",
    "lastname": "Gomez",
    "email": "jeff.gomez@example.com",
    "phone": "410-846-4313x44291",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Nephrology",
    "consultationFee": 174,
    "experience": "27 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Leah",
    "lastname": "Acosta",
    "email": "leah.acosta@example.com",
    "phone": "+1-034-406-9649",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Nephrology",
    "consultationFee": 146,
    "experience": "14 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Shannon",
    "lastname": "Thompson",
    "email": "shannon.thompson@example.com",
    "phone": "142.844.0780x7589",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Pulmonology",
    "consultationFee": 262,
    "experience": "23 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jesse",
    "lastname": "Rodriguez",
    "email": "jesse.rodriguez@example.com",
    "phone": "(506)573-5751x24333",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Pulmonology",
    "consultationFee": 172,
    "experience": "17 years",
    "languages": [
      "French"
    ],
    "title": "Dr.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Charles",
    "lastname": "Snyder",
    "email": "charles.snyder@example.com",
    "phone": "(203)405-4515",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Psychiatry",
    "consultationFee": 257,
    "experience": "21 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Edgar",
    "lastname": "Butler",
    "email": "edgar.butler@example.com",
    "phone": "9658165146",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Psychiatry",
    "consultationFee": 298,
    "experience": "18 years",
    "languages": [
      "French"
    ],
    "title": "Dr.",
    "degree": "MD",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jacob",
    "lastname": "Hernandez",
    "email": "jacob.hernandez@example.com",
    "phone": "(373)553-9794x1288",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Endocrinology",
    "consultationFee": 295,
    "experience": "25 years",
    "languages": [
      "English"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Kayla",
    "lastname": "Sullivan",
    "email": "kayla.sullivan@example.com",
    "phone": "705.188.0517x72549",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Endocrinology",
    "consultationFee": 216,
    "experience": "25 years",
    "languages": [
      "French"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Gail",
    "lastname": "Clark",
    "email": "gail.clark@example.com",
    "phone": "915.564.0337x62548",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Rheumatology",
    "consultationFee": 297,
    "experience": "6 years",
    "languages": [
      "Spanish"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Angela",
    "lastname": "Gonzalez",
    "email": "angela.gonzalez@example.com",
    "phone": "(731)689-1715x6202",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Rheumatology",
    "consultationFee": 165,
    "experience": "21 years",
    "languages": [
      "German"
    ],
    "title": "Prof.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Darren",
    "lastname": "Clark",
    "email": "darren.clark@example.com",
    "phone": "(278)615-3630x087",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Anesthesiology",
    "consultationFee": 152,
    "experience": "22 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "MD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Mikayla",
    "lastname": "Johnson",
    "email": "mikayla.johnson@example.com",
    "phone": "(423)982-1305x59769",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Anesthesiology",
    "consultationFee": 193,
    "experience": "13 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "John",
    "lastname": "Adams",
    "email": "john.adams@example.com",
    "phone": "233.636.7848x736",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Intensive Care Unit (ICU)",
    "consultationFee": 166,
    "experience": "19 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Jerry",
    "lastname": "Patel",
    "email": "jerry.patel@example.com",
    "phone": "001-932-593-0654x9829",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Intensive Care Unit (ICU)",
    "consultationFee": 178,
    "experience": "7 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "MBBS",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Sarah",
    "lastname": "Graham",
    "email": "sarah.graham@example.com",
    "phone": "001-770-279-6331x454",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Infectious Diseases",
    "consultationFee": 153,
    "experience": "6 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Judy",
    "lastname": "Munoz",
    "email": "judy.munoz@example.com",
    "phone": "877-492-5562",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Infectious Diseases",
    "consultationFee": 271,
    "experience": "16 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "John",
    "lastname": "Schroeder",
    "email": "john.schroeder@example.com",
    "phone": "066-185-7060",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Ophthalmology",
    "consultationFee": 130,
    "experience": "20 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "MD",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Julie",
    "lastname": "Jackson",
    "email": "julie.jackson@example.com",
    "phone": "303-125-5801x827",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Ophthalmology",
    "consultationFee": 142,
    "experience": "8 years",
    "languages": [
      "Spanish"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Dave",
    "lastname": "Thompson",
    "email": "dave.thompson@example.com",
    "phone": "824.322.0800x5422",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Otorhinolaryngology (ENT)",
    "consultationFee": 231,
    "experience": "26 years",
    "languages": [
      "French"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Lucas",
    "lastname": "Warren",
    "email": "lucas.warren@example.com",
    "phone": "459.541.8093x663",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Otorhinolaryngology (ENT)",
    "consultationFee": 202,
    "experience": "6 years",
    "languages": [
      "Spanish"
    ],
    "title": "Dr.",
    "degree": "PhD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Barbara",
    "lastname": "Reyes",
    "email": "barbara.reyes@example.com",
    "phone": "(694)902-3230",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Hematology",
    "consultationFee": 148,
    "experience": "11 years",
    "languages": [
      "Mandarin"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Gail",
    "lastname": "Johnson",
    "email": "gail.johnson@example.com",
    "phone": "477.487.0407x5459",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Hematology",
    "consultationFee": 290,
    "experience": "20 years",
    "languages": [
      "English"
    ],
    "title": "Prof.",
    "degree": "DO",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Carrie",
    "lastname": "Oliver",
    "email": "carrie.oliver@example.com",
    "phone": "001-625-676-1879x5459",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Physical Medicine and Rehabilitation",
    "consultationFee": 211,
    "experience": "28 years",
    "languages": [
      "German"
    ],
    "title": "Prof.",
    "degree": "MD",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "firstname": "Justin",
    "lastname": "Mckinney",
    "email": "justin.mckinney@example.com",
    "phone": "(670)082-1095x19763",
    "password": "password123",
    "role": "Doctor",
    "specialty": "Physical Medicine and Rehabilitation",
    "consultationFee": 128,
    "experience": "13 years",
    "languages": [
      "German"
    ],
    "title": "Dr.",
    "degree": "DO",
    "availability": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  }
];

module.exports = doctors;