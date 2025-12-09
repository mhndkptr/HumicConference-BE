import ConferenceScheduleType from "../common/enums/conference-schedule-type-enum.js";
import RoomType from "../common/enums/room-type-enum.js";
import ScheduleType from "../common/enums/schedule-type-enum.js";
import TrackSessionMode from "../common/enums/track-session-mode-enum.js";
import { PrismaService } from "../common/services/prisma-service.js";

class ConferenceScheduleSeeder {
  constructor() {
    this.prisma = new PrismaService();
    // Menambahkan zona waktu (WITA/GMT+8)
    this.timezoneOffset = "+08:00";
    this.timezoneIana = "Asia/Makassar";
  }

  // Fungsi helper untuk membuat tanggal dengan zona waktu yang benar
  createDate(dateString) {
    return new Date(`${dateString}T00:00:00${this.timezoneOffset}`);
  }

  async seed() {
    console.log("Starting conference schedule seeding...");

    await this.prisma.$transaction(async (tx) => {
      // 1. Hapus data lama (urutan terbalik dari dependensi)
      console.log("Cleaning old data...");
      await tx.trackSession.deleteMany({});
      await tx.track.deleteMany({});
      await tx.room.deleteMany({});
      await tx.schedule.deleteMany({});
      await tx.conferenceSchedule.deleteMany({});
      console.log("Old data cleaned.");

      // 2. Buat ConferenceSchedule utama
      console.log("Creating ConferenceSchedule...");
      const conference = await tx.conferenceSchedule.create({
        data: {
          name: "ICICyTA 2024 Conference Program",
          description: "17th - 19th December 2024 (Hybrid)",
          year: "2024",
          start_date: this.createDate("2024-12-17"),
          end_date: this.createDate("2024-12-19"),
          type: ConferenceScheduleType.ICICYTA, // Enum
          is_active: true,
          contact_email: "icicyta@telkomuniversity.ac.id",
          timezone_iana: this.timezoneIana,
          onsite_presentation:
            "THE EVITEL RESORT UBUD, BALI, INDONESIA (2nd Floor)",
          online_presentation: "ZOOM MEETING",
          notes:
            "Link Zoom Main Room & Parallel Session : https://telkomuniversity-ac-id.zoom.us/j/97324049829",
          no_show_policy:
            "Please take note that IEEE has a strict policy on No-Show. Therefore, if your paper is accepted, one of the authors OR their representatives MUST PRESENT their paper at the conference. Papers with no show participants without a valid reason will not be submitted to IEEExplore. NO REFUND of the paid fees may be claimed by the no show author.",

          // 3. Buat semua Schedules dan Rooms (dari Input 3)
          schedules: {
            create: [
              // --- HARI 1: Selasa, 17 Desember 2024 ---
              {
                date: this.createDate("2024-12-17"),
                start_time: "08.30.00",
                end_time: "09.00.00",
                type: ScheduleType.TALK, // Sesuai enum: TALK, BREAK, ONE_DAY_ACTIVITY
                notes: "Open Registration Onsite Day 1",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN, // Sesuai enum: MAIN, PARALLEL
                      description: "Open Registration Onsite Day 1",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "09.00.00",
                end_time: "09.10.00",
                type: ScheduleType.TALK,
                notes: 'Live dance "Tari Sekar Jagad"',
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description: 'Live dance "Tari Sekar Jagad"',
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "09.10.00",
                end_time: "09.15.00",
                type: ScheduleType.TALK,
                notes:
                  "Speech by General Chair Representation (Assoc. Prof. Dr. Putu Harry Gunawan)",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Speech by General Chair Representation (Assoc. Prof. Dr. Putu Harry Gunawan)",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "09.15.00",
                end_time: "09.20.00",
                type: ScheduleType.TALK,
                notes:
                  "Speech by IEEE IS Representative: Prof. Dr. Ir. Gamantyo Hendrantoro",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Speech by IEEE IS Representative: Prof. Dr. Ir. Gamantyo Hendrantoro",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "09.20.00",
                end_time: "09.25.00",
                type: ScheduleType.TALK,
                notes:
                  "Opening Speech by Rector Telkom University : Prof. Dr. Adiwijaya, S.Si., M.Si",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Opening Speech by Rector Telkom University : Prof. Dr. Adiwijaya, S.Si., M.Si",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "09.25.00",
                end_time: "09.30.00",
                type: ScheduleType.TALK,
                notes: "Signing MoU Telkom University dan Kyushu University",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Signing MoU Telkom University dan Kyushu University",
                    },
                  ],
                },
              },
              // ... (Lanjutan data Hari 1 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 1)
              {
                date: this.createDate("2024-12-17"),
                start_time: "09.30.00",
                end_time: "10.30.00",
                type: ScheduleType.TALK,
                notes: "Keynote Speech #1 & Parallel Session 1",
                rooms: {
                  create: [
                    // Main Room
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Keynote Speech #1 : Prof. Kazutaka Shimada\nProfessor in Multi-Modal interpretation, Image processing and Natural Language Processing at Kyushu Institute of Technology, Japan\nTopic : Sentiment Analysis with Language Models\nModerator : Bambang Pudjoatmodjo, S.Si., M.T., Ph.D.",
                    },
                    // Room A (Parallel 1A)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 1A",
                      description: "Moderator: Dr. Kadek Dwi Hendratma Gunawan",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:35", // Sesuai data 4
                      end_time: "10:35", // Sesuai data 4
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571056053",
                                title:
                                  "Augmented Reality Technology for Park Planning: An Innovative Approach to Landscape Design",
                                authors:
                                  "Irfan Armawan (Institut Teknologi Sepuluh Nopember (ITS), Indonesia); Hadziq Fabroyir, Muhammad Iskandar Java and Ilyas Mahfud (Institut Teknologi Sepuluh Nopember, Indonesia)",
                                mode: TrackSessionMode.ONLINE, // Sesuai enum: ONLINE, OFFLINE
                                start_time: "09:35", // Asumsi
                                end_time: "10:35", // Asumsi
                              },
                              {
                                paper_id: "1571058917",
                                title:
                                  "Hybrid Multihop Data Transfer Modelling in Wireless Sensor Network for Bridge Structural Health Monitoring System",
                                authors:
                                  "Naufal Sayyid Furqoon, Seno Adi Putra, SSi MT and Setyorini Setyorini (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571061696",
                                title:
                                  "Forensic Analysis Model On Fintech E-Wallet Using Digital Evidence Generalization",
                                authors:
                                  "Irfan Achmad Firmansyah (Telkom University & PT. Anugrah Rekatama Cipta Solusi, Indonesia); Niken Cahyani and Farah Afianti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571076402",
                                title:
                                  "SMART CRP USING PEGA ROBOTICS: Enhancing Customer Relationship Platforms with Robotics Process Automation",
                                authors:
                                  "Gokul Pandy (IEEE Senior Member, USA); Vivekananda Jayaram (Florida International University, USA); Manjunatha Sughaturu Krishnappa (Oracle, USA); Koushik K Ganeeb (Salesforce, USA); Pankaj Gupta (Discover Financial Services, USA); Amey Ram Banarse (YugabyteDB, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 1B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 1B",
                      description:
                        "Moderator: Julang Aryowiloto, S.I.P.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:35",
                      end_time: "10:35",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571058111",
                                title:
                                  "Development of Scheduling and Room Mapping Application: A Case Study of Practical Room in Higher Education",
                                authors:
                                  "Muhammad Ramadhan Muttaqien, Ekky Novriza Alam and Sinung Suakanto (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571058138",
                                title:
                                  "Development of a Room Mapping Backend System: A Case Study of Practical Classroom Allocation",
                                authors:
                                  "Afif Zaky Muhana, Ekky Novriza Alam and Sinung Suakanto (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571060606",
                                title:
                                  "Advancing Transformer Asset Management with Geographic Information Systems",
                                authors:
                                  "Sinung Suakanto (Telkom University, Indonesia); Chandra Wiharya (State Polytechnic of Malang, Indonesia); Hilda Nuraliza, Mifta Ardianti, Riska Yanu Fa'rifah and Taufik Adi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571061775",
                                title:
                                  "Exploring Methodologies in ICT-enabled Community Development: Bibliometrix Analysis",
                                authors:
                                  "Mega Fitri Yani, Luthfi Ramadani and Iqbal Yulizar Mukti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 1C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 1C",
                      description:
                        "Moderator: Katong Ragawi Numadi, S.Hub.Int.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:35",
                      end_time: "10:35",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571060414",
                                title:
                                  "Multilabel Classification Abusive Language and Hate Speech on Indonesian Twitter Using Transformer Model: IndoBERTweet & IndoRoBERTa",
                                authors:
                                  "Muhammad Ridha, Dade Nurjanah and Muhammad Rakha (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571061778",
                                title:
                                  "Anomaly Detection in Gas Pipes with an Ensemble Learning Approach: Combination of Random Forest and GBoost",
                                authors:
                                  "Novaldi Ramadhan Waluyo, Widi Astuti and Aditya Firman Ihsan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571061806",
                                title:
                                  "Hybrid Data Mining Based On Student Grade Clustering For Major Concentration Classification (Case Study: Xyz University Serang, Banten)",
                                authors:
                                  "Mia Miskiatul Atiroh (Telkom University, Indonesia); Lukman Abdurrahman (Gedung Karang Lt. 2 Fakultas Rekayasa Industri & Telkom University, Indonesia); Oktariani Nurul Pratiwi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571064356",
                                title:
                                  "Transmission Rate Estimation of COVID-19 in Bandung Using SIR Model and Runge-Kutta Fourth-order",
                                authors:
                                  "Diva Annisa Febecca and Putu Harry Gunawan (Telkom University, Indonesia); Didit Adytia (School of Computing, Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 1D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 1D",
                      description:
                        "Moderator: Dr. Surya Michrandi Nasution, ST., MT.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:35",
                      end_time: "10:35",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science", // Nama track bisa sama, tapi ini sesi/grup paper yang berbeda
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571094622",
                                title:
                                  "AI Nail Art Customization: Enhancing User Experience Through Skin Tone and Nail Disease Detection Using Self-Supervised Learning",
                                authors:
                                  "Princess Jane M Nerida and Alexa M Tan (Pamantasan ng Lungsod ng Maynila, Philippines); Criselle J Centeno, Mark Anthony S. Mercado, Vivien A. Agustin and Joseph Darwin C Co (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571094988",
                                title:
                                  "Lung Cancer Classification Based on Ensembling EfficientNet Using Histopathology Images",
                                authors:
                                  "Akif Rachmat Hidayah and Untari N. Wisesty (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571095034",
                                title:
                                  "Optimizing 4Ps Beneficiary Identification: A Web-Based Analysis Using Forecasting and Multiple Linear Regression to Improve Socioeconomic Outcomes",
                                authors:
                                  "Raven Lorenz D. Cagsawa and Andrei Pocholo A Pinauin (Pamantasan ng Lungsod ng Maynila, Philippines); Raymund M Dioses, Criselle J Centeno, Marilou B. Mangrobang and Mark Anthony S. Mercado (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                              {
                                paper_id: "1571095071",
                                title:
                                  "Sentiment Analysis of Steam Video Game Reviews for Disco Elysium Using the Random Forest Tuning Method with Chi-Square Features",
                                authors:
                                  "Dendy Hadinata, Mahendra Dwifebri Purbolaksono,\nUtami Kusuma Dewi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:35",
                                end_time: "10:35",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room E (Tidak ada di data track)
                    {
                      name: "Room E",
                      type: RoomType.PARALLEL,
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "10.30.00",
                end_time: "10.40.00",
                type: ScheduleType.BREAK,
                notes: "Coffee Break",
              },
              // ... (Lanjutan data Hari 1 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 2)
              {
                date: this.createDate("2024-12-17"),
                start_time: "10.40.00",
                end_time: "11.40.00",
                type: ScheduleType.TALK,
                notes: "Keynote Speech #2 & Parallel Session 2",
                rooms: {
                  create: [
                    // Main Room
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Keynote Speech #2: Prof. Dr. I Komang Gde Bendesa, M.A.D.E\nProfessor of ICT in Economic and Tourism at Bali Internasional University, Indonesia\nTopic: IT in Tourism\nModerator : I Wayan Palton Anuwiksa, S.Si., M.Si.",
                    },
                    // Room A (Parallel 2A)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 2A",
                      description:
                        "Moderator: Nyoman Trisna Aryanata, S.Psi.,M.A",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:45", // Sesuai data 4
                      end_time: "11:45", // Sesuai data 4
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571061797",
                                title:
                                  "Enhancing Community Development with Information and Communication Technology: An In-Depth Analysis of Successful Strategies and Approaches",
                                authors:
                                  "Mega Fitri Yani, Luthfi Ramadani and Iqbal Yulizar Mukti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571061848",
                                title:
                                  "Development of a Pedagogical Agent Utilizing ChatGPT as a Response Mechanism and Scaffolding Method for CSS Learning",
                                authors:
                                  "Alvito Baihaqie Yosobumi, Ati Suci Dian Martha and Kusuma Ayu Laksitowening (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571061861",
                                title:
                                  "Design and Implementation of a Data Warehouse for Satu Data at Telkom University",
                                authors:
                                  "Alfito Febriansyah and Kusuma Ayu Laksitowening (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571064767",
                                title:
                                  "Development of Tracking Features and Recommendation for Mother's Nutrition in the Genting Mobile Application to Prevent Stunting Using Vision Transformer (Case Study: PKK Bandung City)",
                                authors:
                                  "Azka Tsawaab Dhafin, Rahmat Fauzi and Zalina Fatima Azzahra (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 2B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 2B",
                      description:
                        "Moderator: A.A Sagung Suari Dewi, S.Psi., M.Psi., Psikolog",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:45",
                      end_time: "11:45",
                      track: {
                        create: {
                          name: "Cybernetics and Biomedical Engineering",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571062078",
                                title:
                                  "Designing a Test Case Catalog Based on Software Requirements Documents Using Text Mining",
                                authors:
                                  "Jahfal Mudrik Ramadhan, Dana Sulistyo Kusumo and Rosa Reska Riskiana (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571064478",
                                title:
                                  "Development of Pattern-Based Test Case Catalog to Increase Reuse and Variety in Software Testing",
                                authors:
                                  "Alwan Kemal, Dana Sulistyo Kusumo and Rosa Reska Riskiana (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571073225",
                                title:
                                  "Robust Reversible Watermarking Application via User Interface",
                                authors:
                                  "Afi Athallah Syamsulhadi Putra, Ledya Novamizanti and Gelar Budiman (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571079300",
                                title:
                                  "CNN Architectures Exploration and Analysis for Multiclass Skin Diseases Identification",
                                authors:
                                  "Nur Afny Catur Andryani (Bina Nusantara University, Indonesia); Yonathan Chandra (BINUS, Indonesia); Maulida Mazaya (National Research and Innovation Agency (BRIN), Indonesia); Said Achmad (Bina Nusantara University, Indonesia); Mohammad Rosyidi (BRIN, Indonesia); Srie Prihianti Gondokaryono (Indonesian Society of Dermatology & Venereology, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 2C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 2C",
                      description:
                        "Moderator: I Gusti Agung Ayu Satwikha Dewi, S.Tr.Kes.,M.Kes",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:45",
                      end_time: "11:45",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571063403",
                                title:
                                  "Smart Ambulance: Mobile Solutions for Booking and Real-Time Tracking",
                                authors:
                                  "Moch Faizal Fahmi, Sinung Suakanto and Ilham Perdana (Telkom University, Indonesia); Edi Triono Nuryatno (The University of Western Australia, Australia & Adisutjipto Institute of Aerospace Technology, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571066796",
                                title:
                                  "Analysis of Factors Influencing the Intention-to-Use Child-monitoring Health Applications with Technology Acceptance Model 3 (TAM 3) (Study Case: Sukabumi Regency)",
                                authors:
                                  "Abrar Zuhdi Aqil Amrullah and Rahmat Fauzi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571083459",
                                title:
                                  "Enhancing Laravel Filament Security Through Owasp-based Secure Code Practices",
                                authors:
                                  "Teguh Rijanandi and Niken Cahyani (Telkom University, Indonesia); Funny Farady Coastera (University of Bengkulu, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571087460",
                                title:
                                  "B-GIS: Modernizing Local Governance Through a Web-Based Barangay Information System With (GIS) Geographic Information System for Efficient Resident Management in Barangay 99, Tondo, Manila",
                                authors:
                                  "Angelo L Jinio, Carlo Gabriel E Del Pilar and Sean Gabriel R Nale (University of City of Manila, Philippines); Mark Christopher R Blanco (University of the City of Manila, Philippines); Ariel Antwaun Rolando Sison (PLM, Philippines); Diony S. Abando (Pamantasan ng Lungsod ng Maynila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 2D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 2D",
                      description: "Moderator: Dr. Kadek Dwi Hendratma Gunawan",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:45",
                      end_time: "11:45",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095098",
                                title:
                                  "Developing a Startup Company Strategy in Energy Sector Using Five Diamond Method",
                                authors: "", // Data penulis kosong di sumber
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571095146",
                                title:
                                  "Designing a Marketplace Platform for MSMEs: A Strategic Approach to Digitalization within the Smart City Concept in Pringsewu Regency",
                                authors:
                                  "Imam Samsudin (Universitas Gadjah Mada, Indonesia); Rudy Hartanto (Gadjah Mada University & Electrical Engineering and Information Technology Departmen, Faculty of Engineering Gadjah Mada University, Indonesia); Wing W. Winarno (Universitas Gadjah Mada, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571095208",
                                title:
                                  "User Satisfaction in Digital Banking Through Artificial Intelligence",
                                authors:
                                  "Sarah Andien Sujanto, Justin Filbert Surya, Justin Ramaputra and Anderes Gui (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                              {
                                paper_id: "1571095327",
                                title:
                                  "Understanding Heritage Through E-WOM: Malacca, Malaysia",
                                authors:
                                  "Putri Mustika, Andi William, Patricia Angelica Heliawanto, Agung Gita Subakti, Nurul Sukma Lestari (Bina Nusantara University, Indonesia); Muhammad Shabir Shaharudin (Universiti Sains Malaysia )",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:45",
                                end_time: "11:45",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room E (Tidak ada di data track)
                    {
                      name: "Room E",
                      type: RoomType.PARALLEL,
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "11.40.00",
                end_time: "12.40.00",
                type: ScheduleType.BREAK,
                notes: "Lunch Break + ISOMA",
              },
              // ... (Lanjutan data Hari 1 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 3)
              {
                date: this.createDate("2024-12-17"),
                start_time: "12.40.00",
                end_time: "14.10.00",
                type: ScheduleType.TALK,
                notes: "Parallel Session 3",
                rooms: {
                  create: [
                    // Room A (Parallel 3A - ONSITE)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 3A",
                      description: "Moderator: Dr. Kadek Dwi Hendratma Gunawan",
                      type: RoomType.PARALLEL,
                      start_time: "12:45", // Sesuai data 4
                      end_time: "14:15", // Sesuai data 4
                      track: {
                        create: {
                          name: "Onsite Track Day 1 (Mixed)", // Nama track tidak spesifik di data
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088925",
                                title:
                                  "Integration of Bundling Product Recommendation System and Stock Management in Fast Fashion Retail Business",
                                authors:
                                  "Susana Limanto (University of Surabaya, Indonesia); Dhiani Tresna Absari (University of Surabaya)",
                                mode: TrackSessionMode.OFFLINE, // Onsite
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571093411",
                                title:
                                  "OBE-Based Course Outcomes Prediction using Machine Learning Algorithms",
                                authors:
                                  "Ellysa Tjandra (University of Surabaya, Indonesia); Ridi Ferdiana and Noor Akhmad Setiawan (Universitas Gadjah Mada, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571063799",
                                title:
                                  "Detection of Employee Fatigue based on Image Processing using Deep Learning Model",
                                authors:
                                  "Michael Ethan and I Gede Putra Kusuma Negara (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571100668",
                                title:
                                  "Estimating SIR Model Parameters for Predicting Covid-19 Cases in Bandung City",
                                authors:
                                  "Kahfi M Bintang (Telkom University, Indonesia); Norma Alias (Universiti Teknologi Malaysia, Malaysia); Wandi Yusuf Kurniawan (School of Computing, Telkom University, Indonesia); Ni Kadek Winda Patrianingsih and Gde Palguna Reganata (Universitas Bali Internasional, Indonesia); Putu Harry Gunawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE, // Data ini tertulis 'Online'
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571065159",
                                title:
                                  "Human-artificial intelligence teaming model in cybersecurity",
                                authors:
                                  "Masike Malatji (University of South Africa SBL, South Africa)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571070552",
                                title:
                                  "Adversarial Robustness in DeepFake Detection: Enhancing Model Resilience with Defensive Strategies",
                                authors:
                                  "Pallavi N (VTU, India & M S Ramaiah Institute of Technology, India); Pallavi TP (Ramaiah Institute of Technology, India); Sushma B (Ramaiah Institute of Technology & Visvesvaraya Technological University, India); Goutam R (Atria Institute of Technology, India)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 3B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 3B",
                      description:
                        "Moderator: Katong Ragawi Numadi, S.Hub.Int.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "12:45",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571066816",
                                title:
                                  "Detection of Narcotics Money Laundering in Suspicious Financial Transactions Using Convolutional Extreme Gradient Boosting (ConvXGB)",
                                authors:
                                  "Leonardus Verrell Sayoga Kinantra Winarno (Bina Nusantara University, Indonesia); Antoni Wibowo (Bina Nusantara University & Jakarta, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571073411",
                                title:
                                  "Implementation of CRISP-DM to Predict on Time Graduation Using Naïve Bayes Algorithm",
                                authors:
                                  "Tito Galaxy Wijaya, Oktariani Nurul Pratiwi and Irfan Darmawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571075252",
                                title:
                                  "A Systematic Analysis of Machine Learning and Deep Learning Strategies for Identifying Fake Reviews",
                                authors:
                                  "Shobrun Jamil Bagastio and Sinung Suakanto (Telkom University, Indonesia); Hanif Fakhrurroja (National Research and Innovation Agency, Indonesia & Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571075939",
                                title:
                                  "Towards a Web-Based Fisheries Management System: An ANN Approach to Fish Weight Prediction",
                                authors:
                                  "Nurul Firdaus (Universitas Sebelas Maret, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571087792",
                                title:
                                  "Negation Handling on XLNet Using Dependency Parser for Sentiment Analysis",
                                authors:
                                  "Ferdinand Winaya and Abba Suganda Girsang (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571087814",
                                title:
                                  "iSUKAT: Capture, Measure, and Know Your Perfect Shoe Size Using Image Recognition",
                                authors:
                                  "Bryle Elys N. Lim, Jowan Gavriel J. Jumamoy, Andrea Elaine Francisco and Criselle J Centeno (University of the City of Manila, Philippines); Ariel Antwaun Rolando Sison (PLM, Philippines ); Erwin D. Marcelo and Raymund M Dioses (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 3C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 3C",
                      description:
                        "Moderator: Julang Aryowiloto, S.I.P.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "12:45",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571084237",
                                title:
                                  "Centralized Rule Sharing Implementation in the Mata Elang Intrusion Detection System (IDS)",
                                authors:
                                  "I Gede Gilang Dharma Suputra (Politeknik Siber dan Sandi Negara, Indonesia); Septia Ulfa Sunaringtyas (National Cyber and Crypto Polytechnic, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571084458",
                                title:
                                  "Semantic Segmentation with Deeplabv3 for Privacy Preservation in Intelligent Transport System",
                                authors:
                                  "Ryan Wicaksono, Muhammad Jibril and Aji Gautama Putrada (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571084840",
                                title:
                                  "Deep Learning Segmentation Models Evaluation for Deforestation Monitoring Embedded Systems",
                                authors:
                                  "Álvaro Sampaio Careli, Evandro Cesar Vilas Boas and Eduardo Henrique Teixeira (Instituto Nacional de Telecomunicações, Brazil); Elaine Cristina de Cássia Silva (National Institute of Telecommunication, Brazil); Guilherme Pedro Aquino (Instituto Nacional de Telecomunicações, Brazil); Felipe Augusto Pereira de Figueiredo (INATEL, Brazil)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571084884",
                                title:
                                  "A Smart Aquaponics System: IoT-Driven Water Quality Control for Lettuce Cultivation",
                                authors:
                                  "Sugondo Hadiyoso, Inung Wijayanto and Dadan Nur Ramadan (Telkom University, Indonesia); Senthil Kumar Appusamy Venkataraman (Bharathiar University, India & Hindusthan College of Arst and Science, India); I Dyah Irawati (Telkom University & Institut Teknologi Bandung, Indonesia); Akhmad Alfaruq (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571085920",
                                title:
                                  "DistilQ-NILM: A Hybrid Quantization-Knowledge Distillation LSTM Model for Edge-Based Load Monitoring",
                                authors:
                                  "Mochamad Nabiel Adiputra, Aji Gautama Putrada and Ikke Dian Oktaviani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571087586",
                                title:
                                  "A Comprehensive Review: Intrusion Detection System Using Machine Learning in Internet of Things",
                                authors:
                                  "Ameer Ahmed Ghani (University of Babylon &amp; Information Technology College, Iraq); Suad Abdullelah Alasadi (University of Babylon & Information Technology College, Iraq)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 3D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 3D",
                      description:
                        "Moderator: A.A Sagung Suari Dewi, S.Psi., M.Psi., Psikolog",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "12:45",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095196",
                                title:
                                  "Comparative Evaluation of Graph Neural Network Algorithms for Music Recommendation Systems",
                                authors:
                                  "Farhan Rangkuti and Fitriyani Fitriyani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095200",
                                title:
                                  "Sentiment Analysis of Political Discourse on Platform X using Graph Neural Network (GNN)",
                                authors:
                                  "Bhagas Ade Pramono and Fitriyani Fitriyani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095206",
                                title:
                                  "Sentiment Analysis of Raya Digital Bank Application Reviews using the TF-IDF Method and Support Vector Machine",
                                authors:
                                  "Hanif Azil Siroot, Mahendra Dwifebri Purbolaksono and Utami Kusuma Dewi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095335",
                                title:
                                  "Performance Analysis of Public Sentiment Towards Electric Vehicles in Indonesia on Social Media X Using Word2Vec and Graph Neural Network",
                                authors:
                                  "Alya Selynindya and Fitriyani Fitriyani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095342",
                                title:
                                  "Customer Sentiment Analysis of Local Skincare Reviews using IndoBERT and Graph Neural Networks",
                                authors:
                                  "Dominica Febryanti and Fitriyani Fitriyani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571098740",
                                title:
                                  "Improving Stunting Detection in Toddlers with Boosted KNN and Boosted Naïve Bayes Techniques",
                                authors:
                                  "Gibran Shevaldo and Putu Harry Gunawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room E (Parallel 3E)
                    {
                      name: "Room E",
                      identifier: "Parallel Session 3E",
                      description:
                        "Moderator: I Gusti Agung Ayu Satwikha Dewi, S.Tr.Kes.,M.Kes",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "12:45",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095346",
                                title:
                                  "Analyzing and Forecasting for Real-Time Marketing Campaign Performance and ROI in the U.S. Market",
                                authors:
                                  "Anupom Debnath and Md Zikar Hossan (Graduate Teaching Assistant, USA); Sadia Sharmin (International American University, USA); Md Saddam Hosain, Fatema Tuz Johora and Mohammad Hossain (Graduate Teaching Assistant, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095410",
                                title:
                                  "Using Data-Driven Marketing to Improve Customer Retention for U.S. Businesses",
                                authors:
                                  "Syeda Kamari Noor and Md Ahsan Ullah Imran (Graduate Teaching Assistant, USA); Mustakim Bin Aziz (Westcliff University, USA & Graduate Teaching Assistant, USA); Barna Biswas and Sanchita Saha (Graduate Teaching Assistant, USA); Rakibul Hasan (Westcliff University, USA & Freedom IT, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095455",
                                title:
                                  "Data Analytics for Improving Employee Retention in the U.S. Technology Sector",
                                authors:
                                  ",,,,Mohammad Hossain, Mia Md Tofayel Gonee Manik, Anamika Tiwari, Jannatul Ferdousmou, Nur Vanu and Anupom Debnath (Graduate Teaching Assistant, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095458",
                                title:
                                  "A Predictive Analysis of Tourism Recovery Using Digital Marketing Metrics",
                                authors:
                                  "Md Ahsan Ullah Imran, Raiyan Raiyan, Md Samiun, Sweety Rani Dhar and Syeda Kamari Noor (Graduate Teaching Assistant, USA); Hasan M Sozib (Ahsanullah University of Science and Technology, Bangladesh)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095471",
                                title:
                                  "AI-Driven Cyber Threat Detection: Revolutionizing Security Frameworks in Management Information Systems",
                                authors:
                                  "Mani Prabha (International American University, USA); Md Azhad Hossain (University of Westcliff, USA); Md Samiun, Mohammad Abu Saleh and Sweety Rani Dhar (Graduate Teaching Assistant, USA); Md Abdullah Al Mahmud (International American University, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571093304",
                                title:
                                  "Evaluation of User Experience (UX) of PT. Bio Farma's SMDV Application Using the User Experience Questionnaire Method",
                                authors:
                                  "Cornelius M Sarungu, Andi Brilianti, Meilina Eka Ayunningtyas and Rafiq Alfansa (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "12:45",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // ... (Lanjutan data Hari 1 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 4)
              {
                date: this.createDate("2024-12-17"),
                start_time: "14.10.00",
                end_time: "14.15.00",
                type: ScheduleType.BREAK,
                notes: "Ice Breaking (Transition)",
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "14.15.00",
                end_time: "15.15.00",
                type: ScheduleType.TALK,
                notes: "Keynote Speech #3 & Parallel Session 4",
                rooms: {
                  create: [
                    // Main Room
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Keynote Speech #3: Assoc. Prof. Dr. Cihangir Tezcan\nAssistant Professor at Department of Cyber Security, Informatics Institute, Middle East Technical University (METU) at Ankara, Turkey\nTopic: Cryptography on GPUs\nModerator : Dr. Kadek Dwi Hendratma Gunawan",
                    },
                    // Room A (Parallel 4A)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 4A",
                      description:
                        "Moderator: Katong Ragawi Numadi, S.Hub.Int.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:20", // Sesuai data 4
                      end_time: "15:20", // Sesuai data 4
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571087743",
                                title:
                                  "Implementation of Scrum Method on Mobile-Based Billing Information System Design (Case Study: ABC Company)",
                                authors:
                                  "Imanuel Murmanto, Dhiwani Maharani Aulia Nur Esa and Salsabila Amara Putri (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571087756",
                                title:
                                  "Approval System Development in Information System for Project Management in a Retail Company",
                                authors:
                                  "Imanuel Murmanto, Akbar Ardhean Santoso, Moh Yusuf Surya Adi Winata and Muhammad Luthfi Abid Cahyadi (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571088265",
                                title:
                                  "Learning Analytics in Higher Education: A Bibliometric Analysis",
                                authors:
                                  "Yulia Magdalena (Universitas Bina Nusantara, Indonesia); Harco Leslie Hendric Spits Warnars (Bina Nusantara, Indonesia); Harjanto Prabowo (Binus University, Indonesia); Sfenrianto Sfenrianto (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571088408",
                                title:
                                  "Techno-Economic and Regulation Analysis Related to Health Tech In Indonesia",
                                authors:
                                  "M Fajar Zulvan Nugraha (University of Telkom, Indonesia & Telkom University, Indonesia); Miftadi Sudjai and Sofia Hertiana (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 4B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 4B",
                      description:
                        "Moderator: Nyoman Trisna Aryanata, S.Psi.,M.A",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:20",
                      end_time: "15:20",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088615",
                                title:
                                  "Brand Health Analysis of Local Beauty Products E-Commerce in Indonesia",
                                authors:
                                  "Andi William (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571095351",
                                title:
                                  "Performance Variations in Digital Talent: Gender-Based Insights from STEM and AI Education Backgrounds",
                                authors:
                                  "Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia); Azani Cempaka Sari, Irma Kartika Wairooy, Muhamad Keenan Ario, Said Achmad and Devi Fitrianah (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571090238",
                                title:
                                  "Evaluating The Effectiveness Of Voucher Utilization In Influencing Decisions To Use Digital Payment In E-Commerce",
                                authors:
                                  "Nicholas Lie Hermawan, Dyotiskhanti Kusuma, Nathanael Manurung and Suryanto (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571090427",
                                title:
                                  "iTaskDev: A Software as a Service with Adaptive Algorithm for Optimized Software Development Planning Across Methodologies",
                                authors:
                                  "Aldren John M Mendoza, Norman Alexiz D. Nacilla, Charles Sherwin B. San Gabriel, Mark Anthony S. Mercado, Vivien A. Agustin, Erwin D. Marcelo and Criselle J Centeno (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 4C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 4C",
                      description:
                        "Moderator: I Gusti Agung Ayu Satwikha Dewi, S.Tr.Kes.,M.Kes",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:20",
                      end_time: "15:20",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571090564",
                                title:
                                  "Classification of Mango Plant Leaf Diseases Using Optimized ConvNeXt",
                                authors:
                                  "Ahmad Taufiq Nur Rohman and Febryanti Sthevanie (Telkom University, Indonesia); Kurniawan Nur Ramadhani (Universitas Telkom, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571090621",
                                title:
                                  "Evaluation of Modified Inception-v3 Model in Tomato Fruit Ripeness Classification on Image",
                                authors:
                                  "Muhammad Faiq Jabbar and Febryanti Sthevanie (Telkom University, Indonesia); Kurniawan Nur Ramadhani (Universitas Telkom, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571091136",
                                title:
                                  "Model Predicting Airline Passengers Purchasing Seat Upgrade Ancillaries Products on Indonesian Domestic Routes with Random Forest Machine Learning",
                                authors:
                                  "Anggara Mahardika (Binus University, Indonesia); Ahmad Nurul Fajar (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571091635",
                                title:
                                  "Sentiment Analysis and Topic Modeling For Duolingo Application on Google Play Store",
                                authors:
                                  "Rizaldi Farhan Firdaus, Oktariani Nurul Pratiwi and Iqbal Yulizar Mukti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 4D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 4D",
                      description:
                        "Moderator: Dr. Surya Michrandi Nasution, ST., MT.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:20",
                      end_time: "15:20",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095344",
                                title:
                                  "Leveraging Artificial Intelligence and Blockchain to Stabilize Rice Price Fluctuations in DKI Jakarta, Indonesia",
                                authors:
                                  "Jeremy Raphael (BINUS Business School Program, Indonesia); Andi William (Bina Nusantara University, Indonesia); Elsyira Carissa Praspera and Michael Vincentius (BINUS Business School Program, Indonesia); Bayu Nugroho (Universitas Gadjah Mada, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571076540",
                                title:
                                  "Robust Reversible Watermarking using Polar Harmonic Transform on RGB Image",
                                authors:
                                  "Syifa Dwi Sulistyowati, Ledya Novamizanti and Gelar Budiman (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571094166",
                                title:
                                  "Implementation of Advanced Encryption Standard (AES) 256 Algorithm on Web Based Application for Protecting Sensitive Data on Mikrotik CCR 1009 VPNIP Device",
                                authors:
                                  "Aufa Yuslizar Rajab, Windarto Windarto, Achmad Solichin and Muhammad Syafrullah (Universitas Budi Luhur, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                              {
                                paper_id: "1571101722",
                                title:
                                  "Enhancing Multiclass Classification of Child Nutritional Status Using KNN and Random Forest with SMOTE",
                                authors:
                                  "Aqeela Fathya Najwa, Indwiarti Indwiarti and Putu Harry Gunawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:20",
                                end_time: "15:20",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room E (Tidak ada di data track)
                    {
                      name: "Room E",
                      type: RoomType.PARALLEL,
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "15.15.00",
                end_time: "15.25.00",
                type: ScheduleType.BREAK,
                notes: "Coffee Break",
              },
              // ... (Lanjutan data Hari 1 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 5)
              {
                date: this.createDate("2024-12-17"),
                start_time: "15.25.00",
                end_time: "17.55.00", // Waktu selesai diambil dari 17.55.00, durasi 2.30
                type: ScheduleType.TALK,
                notes: "Parallel Session 5",
                rooms: {
                  create: [
                    // Room A (Parallel 5A - ONSITE)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 5A",
                      description:
                        "Moderator: I Wayan Palton Anuwiksa, S.Si., M.Si.",
                      type: RoomType.PARALLEL,
                      start_time: "15:30", // Sesuai data 4
                      end_time: "18:00", // Sesuai data 4
                      track: {
                        create: {
                          name: "Onsite Track Day 1 (Mixed 2)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571071747",
                                title:
                                  "Comparison of Classification Algorithms on Product Boycott Sentiment Analysis in Real Time",
                                authors:
                                  "Trisna Ari Roshinta (Universitas Sebelas Maret, Indonesia & Budapest University of Technology and Economics, Hungary); Darmawan Lahru Riatma, Masbahah Masbahah, Yusuf Fadlila Rachman, Nur Azizul Hakimi and Sevyra Nanda Octavianti (Universitas Sebelas Maret, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571072466",
                                title:
                                  "Performance Analysis of Vehicle Counting and Classification using YOLO at a Four-Way Intersection",
                                authors:
                                  "Muhammad Ammar Murtaqib (Bandung Institute of Tech, Indonesia); Figo Agil Alunjati (Institut Teknologi Bandung & Smart City and Community Innovation Center, Indonesia); Ulva Elviani (Bandung Institute of Tech, Indonesia); Fadhil Hidayat (Jalan Ganeca No. 10, Indonesia & Smart City Community and Innovation Center, Indonesia); I Gusti Bagus Baskara Nugraha (Institut Teknologi Bandung, Indonesia); Suhono Harso (Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571077168",
                                title:
                                  "Intersection Performance Evaluation based on Indonesian Road Capacity Manual with Video Analytics",
                                authors:
                                  "Figo Agil Alunjati (Institut Teknologi Bandung & Smart City and Community Innovation Center, Indonesia); Fadhil Hidayat (Jalan Ganeca No. 10, Indonesia & Smart City Community and Innovation Center, Indonesia); Muhammad Ammar Murtaqib (Bandung Institute of Tech, Indonesia); Ayub Seipanya (Bandung Institute of Technology, Indonesia);",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571087745",
                                title:
                                  "A Practical Indoor Positioning System based on Collaborative PDR and Wi-Fi Fingerprinting",
                                authors:
                                  "Made Harta Dwijaksara (University of Indonesia, Indonesia & Pusat Ilmu Komputer UI, Indonesia); Siva Priya Thiagarajah (Multimedia University, Malaysia); Raissa Tito Safaraz (Univerity of Indonesia, Indonesia); Muhammad Asyraf and Julius Prayoga Raka Nugroho (University of Indonesia, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571090916",
                                title:
                                  "Improving Skin Disease Classification with EfficientNetB0: A Deep Learning Approach to Overfitting Control",
                                authors:
                                  "Raihan Atsal Hafizh, Rifki Wijaya, Afrizal Ihyauddin Yafi' and Satria Aji Permana Siwi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571091093",
                                title:
                                  "Detection of muscle synergy by wrist electromyogram",
                                authors:
                                  "Toma Nakagawa, Shin-ichi Ito, Momoyo Ito and Minoru Fukumi (Tokushima University, Japan)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571097226",
                                title:
                                  "Smart Monitoring and Watering System for Farm Management Assistance",
                                authors:
                                  "Muhammad Dzaki Dwi Putranto (Bandung Institute of Technology, Indonesia); Suhono Harso (Indonesia); I Gusti Bagus Baskara Nugraha (Institut Teknologi Bandung, Indonesia); Ahmad Ali Hakam Dani (Bandung Institute of Technology, Indonesia & Universitas Andi Djemma Palopo, Indonesia); Hastie Audytra (Bandung Institute of Technology, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571094254",
                                title:
                                  "Enhancing Urban Waste Management: An IoT and LoRa-Integrated Smart Bin System for Volume Monitoring and Analysis",
                                authors:
                                  "Muhammad Farhan Imanudin and Rezky Kinanda (School of Electrical and Informatics Engineering Bandung Institute of Technology, Indonesia); Noor Falih (Universitas Pembangunan Nasional Veteran Jakarta, Indonesia); Arry Arman (Institut Teknologi Bandung, Indonesia); Emenda Sembiring (School of Electrical and Informatics Engineering Bandung Institute of Technology, Indonesia); Suhono Harso (Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571094722",
                                title:
                                  "Application of Transformer Models for Autonomous Off-Road Vehicle Control: Challenges and Insights",
                                authors:
                                  "M A Hannan Bin Azhar (Canterbury Christ Church University, United Kingdom (Great Britain)); Zoltan Meszaros and Tasmina Islam (King's College London, United Kingdom (Great Britain))",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095398",
                                title:
                                  "Comparative Analysis of User Experience Shopee and TikTok Shop Utilizing User Experience Questionnaire",
                                authors:
                                  "Emanuel Ristian Handoyo (Universitas Atma Jaya Yogyakarta, Indonesia); Aurelia Melinda Nisita Wardhani (Universitas Sanata Dharma, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 5B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 5B",
                      description:
                        "Moderator: Julang Aryowiloto, S.I.P.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "15:30",
                      end_time: "18:00",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571087762",
                                title:
                                  "Low-Rank Factorization For Edge Computing in Fall Detection with Wearable Sensors",
                                authors:
                                  "Geo Nanda Iswara, Aji Gautama Putrada and Hilal H. Nuha (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571088072",
                                title:
                                  "Comparative Performance Evaluation of LoRa RFM-95W and RA-01H Modules at 921.4 MHz Range and Signal Quality Analysis with Rubber Duck and Spring Antennas",
                                authors:
                                  "Raihan Radhitya Setiawan, Reynaldhi Tryana Graha and Ridho Ansyah Sojuangon Panggabean (Telkom University, Indonesia); Hanif Fakhrurroja (National Research and Innovation Agency, Indonesia & Telkom University, Indonesia); Linda Meylani and Dita Pramesti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571089777",
                                title:
                                  "AI-Driven Personalized Fitness Workout Assistance and Tracker Using YOLOv8 Algorithm",
                                authors:
                                  "Laurence Ray E. Bautista, Chynna G. Mangalindan, Airis Jun Marie G. Masagca, Criselle J Centeno, Marilou B. Mangalbang and Dan Michael A. Cortez (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571090106",
                                title:
                                  "Cost Effective IoT-Based Smart System for Avoidance of Obstacle and Intruder Detection",
                                authors:
                                  "Md. Shadman Sakib Talukdar, Md, Mahiyan Rahman Takbir, Imam Tajnoor Hossain Amrit, Md Mahin Rahman and Mohammad Noor Nabi (Independent University, Bangladesh, Bangladesh)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571093265",
                                title:
                                  "Defect Detection in Printed Circuit Boards Based on EdgeML and Computer Vision",
                                authors:
                                  "Felipe G. F. Rocha and Felipe Augusto Pereira de Figueiredo (INATEL, Brazil); Hyago Vieira Silva (Instituto Nacional de Telecomunicações, Brazil); Rodrigo B. Vimieiro (University of Sao Paulo, Brazil)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571094383",
                                title:
                                  "LubriScan: A Deep Learning Approach for Revealing Counterfeit Motorcycle Oil/Lubricants via Primary Packaging Analysis",
                                authors:
                                  "Joselito Joshua S Abrera, Jr (University of the City of Manila, Philippines); Denmark O Santiago and Gab P Caballes (Pamantasan ng Lungsod ng Maynila, Philippines); Criselle J Centeno and Richard C. Regala (University of the City of Manila, Philippines); Diony S. Abando (Pamantasan ng Lungsod ng Maynila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571094514",
                                title:
                                  "Cyberattack Incidents In South Africa: A Survey",
                                authors:
                                  "Cynthia Hombakazi H Ngejane, Samson Chishiri, Sivuyile Shwayimba, Siwe Moyakhe, Sanele Miya, Geena Lwana(CSIR, South Africa)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095377",
                                title:
                                  "Leveraging Honeypot to Uncover Attack Behaviors on Redis",
                                authors:
                                  "Mariano Joseph Tendean, S.Kom (Swiss Germany University, Indonesia & Swiss German University, Indonesia); Charles Lim and Kalpin Erlangga (Swiss German University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095383",
                                title:
                                  "Enhancing Honeypot Realism: A Framework for Improved Cyber Threat Intelligence through Dynamic Web Cloning",
                                authors:
                                  "Ismail Choiri, Charles Lim and Kalpin Erlangga (Swiss German University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095093",
                                title:
                                  "Critical Success Factor of Discord Usage: A Systematic Literature Review",
                                authors:
                                  "Natalicia Margatan (BINUS University, Indonesia); Tanty Oktavia (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 5C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 5C",
                      description: "Moderator: Dr. Kadek Dwi Hendratma Gunawan",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "15:30",
                      end_time: "18:00",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571087905",
                                title:
                                  "Virality Prediction on Twitter Using Combined CNN and BERT Models",
                                authors:
                                  "Hilarius Ryan Auxilio Benedecas and Abba Suganda Girsang (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571087935",
                                title:
                                  "Exploring Ensembles Method for Predicting Corporate Bankruptcy",
                                authors:
                                  "Riyana Kartika Pratiwi, Tora Fahrudin and Dedy Rahman Wijaya (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571087938",
                                title:
                                  "Exploring Deep Learning Algorithm for Credit Scoring",
                                authors:
                                  "Velani Febriana Putri and Tora Fahrudin (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571088011",
                                title:
                                  "Dust-Induced Power Loss in Solar Plants: A Real- time Web Application for Degradation Prediction using Decision Trees and Random Forests Regressions",
                                authors:
                                  "Zulkifli Tahir (Hasanuddin University, Indonesia); Tyanita Puti Marindah Wardhani (Universitas Hasanuddin, Indonesia); Syafruddin Syarif and Moh Abib Safaqdillah (Hasanuddin University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571088224",
                                title:
                                  "Sentiment Analysis: Indonesia Netflix User's Comment Using Multiple Lexicon-Based Dictionaries",
                                authors:
                                  "Sebastianus Adi Santoso Mola, Tiwuk Widiastuti and Rosa V. K. Isabela Ohe Roma (Nusa Cendana University, Indonesia); Andrea Stevens Karnyoto (Binus University & BDSRC, Indonesia); Bens Pardamean (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571088310",
                                title:
                                  "Vessel Visual Surveillance Based on YOLOv8 Architecture: Daytime and Night Comparison",
                                authors:
                                  "Khusnul Muchlisin and Reza Fuad Rachmadi (Institut Teknologi Sepuluh Nopember, Indonesia); Supeno Mardi Susiki Nugroho (Sepuluh Nopember Institute Of Technology, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571098849",
                                title:
                                  "Predicting Stunting Prevalence in Indonesia Using XGBoost and Artificial Neural Networks",
                                authors:
                                  "Adinugraha Dharmaputra, Putu Harry Gunawan and Indwiarti Indwiarti (Telkom University, Indonesia); Wandi Yusuf Kurniawan (School of Computing, Telkom University, Indonesia); Amila Nafila Vidyana (Telkom University, Indonesia); I Kadek Arya Sugianta (Universitas Bali Internasional, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571067701",
                                title:
                                  "Gap Analysis on Interoperability of Blockchain Enabled Traceability Tools for Digital Product Passports",
                                authors:
                                  "Soumya Kanti Datta (Digiotouch, Estonia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571083559",
                                title:
                                  "Artificial Intelligence-Powered Intent Classification for Indonesian E-Wallet Customer Service Chatbots",
                                authors:
                                  "Christopher Owen and Derwin Suhartono (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571074332",
                                title:
                                  "Clustering High-Dimensional Spaces Using a Modified EM Algorithm with Fractional Order Assignment",
                                authors:
                                  "Shivani Saxena (Institute of Advanced Research, India); Prince Rajyaguru (SPEC India, India); Shruti Saxena (National Forensics Sciences University, India); Nilesh Patel (INSTITUTE OF ADVANCED RESEARCH, India); Ahsan Rizvi (Swedish University of Agricultural Sciences, Sweden)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 5D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 5D",
                      description:
                        "Moderator: Katong Ragawi Numadi, S.Hub.Int.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "15:30",
                      end_time: "18:00",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095376",
                                title:
                                  "Unveiling Generative Adversarial Network Adoption in Design Processes",
                                authors:
                                  "Priscilla Anthonio Kurniawan, Veny Veny, Michelle Chau and Anderes Gui (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095384",
                                title:
                                  "The Influence of Social Media, Environmental Awareness, Willingness to Pay, and Eco-Labeling on and Environmental Purchasing Behavior in E-Commerce",
                                authors:
                                  "Ivory Thania (Bina Nusantara University, Indonesia); Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095454",
                                title:
                                  "A Novel Enterprise Artificial Intelligence Architecture Framework (NAEF) for Business Capabilities to Decisions/Insights Analysis",
                                authors:
                                  "Heru Ipung (Swiss German University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095518",
                                title:
                                  "Unlocking Efficiency through a Comparative Analysis of Predictive Text on User Chatting Experience in iOS and Android Smartphones",
                                authors:
                                  "Yohannes Kurniawan, Tiziara Adzani Kusumawardana and Ni Putu Tara Diva (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571093241",
                                title:
                                  "The Influence of Social Learning Factors on Customer Purchase Intention in Online Stores",
                                authors:
                                  "Steven Laurencius, Hian Dwiputra Let Let, Stanley Natan Aminius and Manise Hendrawaty (BINUS University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095527",
                                title:
                                  "Generation Z's Impulsive Buying Comparison on Using Conventional Transaction and Digital Banking Application",
                                authors:
                                  "Yohannes Kurniawan, Okta Nabilla Syahdini, Audrey Marchella Firzy and Aurel Devina Krisanti (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571088644",
                                title:
                                  "How content marketing to customer advocacy through entertainment intention leverage in social media platform?: The Evidence from Indonesia",
                                authors:
                                  "Rajiv Dharma Mangruwa (Telkom University, Indonesia); Uswatun Khasanah (School of Economics and Business, Telkom University Indonesia, Indonesia); Nurafni Rubiyanti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571093850",
                                title:
                                  "Assessment of Supply Management Maturity Through Information Extraction and Enterprise Modelling at PT Indosat Tbk",
                                authors:
                                  "Muharman Lubis, Fitriyana Dewi, Yumna Zahran Ramadhan, Kusumah Anggraito and Rafian Ramadhani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571095388",
                                title:
                                  "Fostering Digital Innovation in Indonesia: The Role of STEM-AI Skills in Overcoming Talent Deficits and Gender Stereotypes",
                                authors:
                                  "Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia); Amalia Zahra (BINUS Graduate Program, Bina Nusantara University, Indonesia); Lili Ayu Wulandari (Universitas Bina Nusantara, Indonesia); Maryani Maryani, Devi Fitrianah and Virienia Puspita (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                              {
                                paper_id: "1571094906",
                                title:
                                  "The Impact of Social Media's Live Shopping Feature on the Behavioural Responses of Indonesia’s Generation Z",
                                authors:
                                  "Patrick William Porsan, Stephanie Surja and Heny Kurniawati (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "15:30",
                                end_time: "18:00",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room E (Tidak ada di data track)
                    {
                      name: "Room E",
                      type: RoomType.PARALLEL,
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-17"),
                start_time: "17.55.00",
                end_time: "18.05.00",
                type: ScheduleType.TALK,
                notes: "Closing Day 1",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description: "Closing Day 1",
                    },
                  ],
                },
              },
              // --- AKHIR HARI 1 ---

              // ... (Lanjutan data Hari 2 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 6)

              // --- HARI 2: Rabu, 18 Desember 2024 ---
              {
                date: this.createDate("2024-12-18"),
                start_time: "08.30.00",
                end_time: "09.00.00",
                type: ScheduleType.TALK,
                notes: "Registration Onsite Day 2",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description: "Registration Onsite Day 2",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "09.00.00",
                end_time: "09.05.00",
                type: ScheduleType.TALK,
                notes: "Opening Day 2",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description: "Opening Day 2",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "09.05.00",
                end_time: "10.05.00",
                type: ScheduleType.TALK,
                notes: "Keynote Speech #4 & Parallel Session 6",
                rooms: {
                  create: [
                    // Main Room
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Keynote Speech #4: Assoc. Prof. Dr. Satria Mandala\nAssociate Professor of Telemedicine System & Artificial Intelligence, and Director of Research Center for Human Centric Engineering at Telkom University, Indonesia.\nTopic: Accurate Model for Arrhythmia Classification Using AI\nModerator : Bambang Pudjoatmodjo, S.Si., M.T., Ph.D.",
                    },
                    // Room A (Parallel 6A)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 6A",
                      description:
                        "Moderator: Made Adhyatma Prawira Natha Kusuma, S.KM., M.KKK.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:05", // Sesuai data 4
                      end_time: "10:05", // Sesuai data 4
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088632",
                                title:
                                  "Machine Learning Approach to Analyzing and Predicting Revenue Trend in Mineral Water Sales",
                                authors:
                                  "Ernesta Felicia (Multimedia Nusantara University, Indonesia & Medang, Indonesia); Ririn Desanti (Universitas Multimedia Nusantara, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571088652",
                                title:
                                  "Reconstructing Detailed 3D Car Geometries from a Single 2D Image by Repurposing PIFu",
                                authors:
                                  "Fadrianto Sulistiyorahman, Bedy Purnama and Edward Ferdian (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571094973",
                                title:
                                  "Research Trends on e-Tendering Implementation - A Systematic Literature Review (SLR)",
                                authors:
                                  "Syifa Nurgaida Yutia, Christanto Triwibisono and  Sasmi Hidayatul Yulianing Tyas  (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571090396",
                                title:
                                  "Pneumonia Detection through X-ray Images Using EfficientNet Architecture on TensorFlow Lite",
                                authors:
                                  "Galih Akbar Nugraha and Untari N. Wisesty (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571090401",
                                title:
                                  "Pneumonia Detection based on Chest X-Ray Images with MobileNetV2 Architecture",
                                authors:
                                  "Falah Asyraf Darmawan Putra and Untari N. Wisesty (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571090557",
                                title:
                                  "Detecting Motorcycle Crime Gangs in CCTV Video Footage Using YOLOv9 and CNN",
                                authors:
                                  "Versa Syahputra Santo, Gamma Kosala and Rifki Wijaya (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 6B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 6B",
                      description:
                        "Moderator:Katong Ragawi Numadi, S.Hub.Int.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:05",
                      end_time: "10:05",
                      track: {
                        create: {
                          name: "Cybernetics and Biomedical Engineering",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088287",
                                title:
                                  "Analysis of Psychological Stress and Muscle Activity Using Electromyography and Stress Test",
                                authors:
                                  "Eldhian Bimantaka Christianto and Beni Rio Hermanto (Bandung Institute of Technology, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571088293",
                                title:
                                  "Architecture Design of TBCare: Mhealth for Drug Adherence Intervention in Tuberculosis Patients",
                                authors:
                                  "Dadi Rahmat, Allya Paramita Koesoema and Beni Rio Hermanto (Bandung Institute of Technology, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571091962",
                                title:
                                  "Modified ReLU in Deep Learning Models and Explainable AI Techniques for Accurate and Interpretable Breast Cancer Subtype Classification",
                                authors:
                                  "Wahyu Adi Nugroho, Catur Supriyanto, Guruh Fajar Shidik and Pujiono Pujiono (Universitas Dian Nuswantoro, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571092017",
                                title:
                                  "A Machine Learning Framework for Valve Disease Detection and Cardiac Parameter Estimation Using Seismocardiogram Signals",
                                authors:
                                  "Moirangthem James Singh (Indian Institute of Technology Guwahati, India); L N Sharma (IIT Guwahati, India); Samarendra Dandapat (Indian Institute of Technology Guwahati, India)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 6C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 6C",
                      description:
                        "Moderator: Nyoman Trisna Aryanata, S.Psi.,M.A",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:05",
                      end_time: "10:05",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088447",
                                title:
                                  "Performance Evaluation of the Dragino DLOS8N and Four-Faith F8L10GW LoRaWAN Gateways in an Urban Scenario",
                                authors:
                                  "Reynaldhi Tryana Graha and Raihan Radhitya Setiawan (Telkom University, Indonesia); Hanif Fakhrurroja (National Research and Innovation Agency, Indonesia & Telkom University, Indonesia); Linda Meylani and Dita Pramesti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571088453",
                                title:
                                  "Design and Development of a Woman Safety Device Prototype with Fingerprint Authentication",
                                authors:
                                  "Danang Enggar Risyaf Alam (National Cyber and Crypto Polytechnic, Indonesia); Fetty Amelia, Dion Ogi and Desi Marlena (Politeknik Siber dan Sandi Negara, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571088904",
                                title:
                                  "Public Perceptions Regarding Data Privacy in Use of Smart Speaker",
                                authors:
                                  "Frederic Gabriel, Jayson Cornelis, George Samuel Handaja and Anderes Gui (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571092880",
                                title:
                                  "Enhancing Community Project Effectiveness: A Real-Time Monitoring and Evaluation Framework with Rule-Based Algorithms, Advanced Encryption Standard, and Content-Based Filtering",
                                authors:
                                  "Renz Cyril V. Raymundo, Princess G. Lara and Criselle J Centeno (University of the City of Manila, Philippines); Ariel Antwaun Rolando Sison (University of the City of Manila); Jetro L San Diego and Mary Grace N. Gonzales (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 6D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 6D",
                      description: "Moderator: Dr. Kadek Dwi Hendratma Gunawan",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "09:05",
                      end_time: "10:05",
                      track: {
                        create: {
                          name: "Cybernetics and Biomedical Engineering",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571081066",
                                title:
                                  "Implementation of Ensemble Machine Learning with Voting Classifier and CLAHE Pre-processing for Reliable Tuberculosis Detection",
                                authors:
                                  "Muhammad Ilham Jauhari, Catherine M Sudarno, Rifani Rachmat, Inung Wijayanto, Sugondo Hadiyoso and Achmad Rizal (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571095202",
                                title:
                                  "PCB-based Wireless Biomicrofluidic Device for Biochemical Detection toward Point-of-Care Applications",
                                authors:
                                  "Bao-Anh Hoang (VNU University of Engineering and Technology, Hanoi, Vietnam); Phu Nguyen Van (VNU University of Science, Vietnam); Nguyen Thi Bich Ngoc (Ha Noi Unviversity of Science, Vietnam); Tung Thanh Bui (VNU University of Engineering and Technology, Vietnam); Thuy Ha Tran Thi (Posts and Telecommunications Institute of Technology, Vietnam); Tuan Quoc Vu (VNU, University of Engineering and Technology (UET), Vietnam)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571088626",
                                title:
                                  "Classification of Prostate Precancerous Cells using DenseNet-201 and Inception-v3 Models",
                                authors:
                                  "Yessi Jusman, Dwi Ahirita Ramadani and Muhammad Ahdan Fawwaz Nurkholid  (Universitas Muhammadiyah Yogyakarta, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                              {
                                paper_id: "1571089425",
                                title:
                                  "Digital Forensic on Image Manipulation Crime - A Systematic Literature Review",
                                authors:
                                  "Syifa Nurgaida Yutia, Christanto Triwibisono and Gagas Ezhar Rahmayadi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "09:05",
                                end_time: "10:05",
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "10.05.00",
                end_time: "10.15.00",
                type: ScheduleType.BREAK,
                notes: "Coffee Break",
              },
              // ... (Lanjutan data Hari 2 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 7)
              {
                date: this.createDate("2024-12-18"),
                start_time: "10.15.00",
                end_time: "11.15.00", // Waktu selesai diambil dari 11.15.00, namun data 4 (12:15) tumpang tindih dengan Tutorial Session. Saya akan mengikuti data 3 (11.15) untuk Sesi 7.
                type: ScheduleType.TALK,
                notes: "Parallel Session 7",
                rooms: {
                  create: [
                    // Room A (Parallel 7A - ONSITE)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 7A",
                      description:
                        "Moderator: I Wayan Palton Anuwiksa, S.Si., M.Si.",
                      type: RoomType.PARALLEL,
                      start_time: "10:15", // Sesuai data 4
                      end_time: "12:15", // Sesuai data 4
                      track: {
                        create: {
                          name: "Onsite Track Day 2 (Mixed)",
                          track_sessions: {
                            create: [
                              // Data paper pertama kosong
                              {
                                paper_id: "1571093770",
                                title:
                                  "Segmentation and Recognition of Aerial Handwritten Hiragana",
                                authors:
                                  "Kotaro Hosono, Shin-ichi Ito, Momoyo Ito and Minoru Fukumi (Tokushima University, Japan)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571094052",
                                title:
                                  "A Real-time Analytics Approach for Computer Vision Syndrome Detection",
                                authors:
                                  "Gabriel Alvaro and I Made Murwantara (Universitas Pelita Harapan, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571094248",
                                title:
                                  "A Consideration on Understanding of a Learning Based on EEG and ECG analysis Using Artificial Intelligence Models",
                                authors:
                                  "Ryota Miyake, Shin-ichi Ito, Momoyo Ito and Minoru Fukumi (Tokushima University, Japan)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571095055",
                                title:
                                  "Evaluating XGBoost for Competitive Insurance Pricing: A Case Study on Motor Third-Party Liability Insurance",
                                authors:
                                  "Jonathan Ibrahim, Jonathan Stanley and Hendri Murfi (Universitas Indonesia, Indonesia); Fevi Novkaniza (University of Indonesia, Indonesia); Sindy Devila (Universitas Indonesia, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571095312",
                                title:
                                  "Adaptive Software Management for Economic Drone: Leveraging Software Product Line Engineering for Multi-Mission Efficiency",
                                authors:
                                  "I Made Murwantara and Pujianto Yugopuspito (Universitas Pelita Harapan, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571095205",
                                title:
                                  "A Prototype Tool for Assisting Stopwatch Calibration with a Data Recording System Based on Imaging Techniques",
                                authors:
                                  "Willi Sutanto (Metrology and Instrumentation Academy, Indonesia & Ministry of Trade, Indonesia); Grace Natalia Silaen, Gianto Gianto, Vera Firmansyah, Dudi Adi Firmansyah and Nandang Gunawan Tunggal Waras (Metrology and Instrumentation Academy, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571095326",
                                title:
                                  "Comparative Analysis of Interbeat Interval and Heart Rate Variability Measurements from Wearable Devices",
                                authors:
                                  "Raudha Munawarah, Hansel Valentino Tanoto and Nur Ahmadi (Bandung Institute of Technology, Indonesia); Rahmat Mulyawan (Institut Teknologi Bandung (ITB), Indonesia); Rayhan Maditra Indrayanto and Khamelia Malik (University of Indonesia, Indonesia); Trio Adiono (STEI ITB, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 7B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 7B",
                      description: "Moderator: Dr. Kadek Dwi Hendratma Gunawan",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:15",
                      end_time: "12:15",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571090651",
                                title:
                                  "The Impact of User Generated Content (UGC) on Impulsive Buying in Live Streaming Marketing",
                                authors:
                                  "Manaek Mikael, Mohammad Alexander and Ilham Prabintang Setio (Bina Nusantara University, Indonesia); Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571091025",
                                title:
                                  "Improving facility layout using genetic algorithm and Simulated Annealing",
                                authors:
                                  "Rahmanda Wulandari (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571091264",
                                title:
                                  "Analysis of Behavior and Acceptance of Biometric Authentication System on Students Using the UTAUT Model",
                                authors:
                                  "Reihan Syahfitra Wirawan and Rio Guntur Utomo (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093173",
                                title:
                                  "LayOut Loud: An AI-Powered Augmented Reality and Mobile Application for Room Interior Design and Layout Optimization",
                                authors:
                                  "John Kenneth R. Rili, Anny Neolicia G. Santillan, John Raphael G. Cuevas, Vivien A. Agustin, Mary Grace N. Gonzales, Criselle J Centeno and Richard C. Regala (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093239",
                                title:
                                  "Examining the Factors Influencing the Website Continuous Actual Usage of SME Owners in Indonesia",
                                authors:
                                  "Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia); Jennie Rowan, Christopher Suryadi and Christian Theddy (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571081618",
                                title:
                                  "Investigating OTT Subscription business in Indonesia: Analysis Perceived Value to Behavioral Intention trough mediator and moderator examination",
                                authors:
                                  "Rajiv Dharma Mangruwa, Shaomi Fujiyanti Amalia and Nurafni Rubiyanti (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093634",
                                title:
                                  "Factors Affecting The Effectiveness Of Hospitality Information System",
                                authors:
                                  "Henkie Ongowarsito and Sherleen Daventa (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093705",
                                title:
                                  "Artificial Intelligence in Security Education, Training and Awareness: A Bibliometric Analysis",
                                authors:
                                  "Hasiva Amalia Dewi, Candiwan Candiwan and Puspita Kencana Sari (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 7C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 7C",
                      description:
                        "Moderator: Dr. Surya Michrandi Nasution, ST., MT.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:15",
                      end_time: "12:15",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571093142",
                                title:
                                  "Time Complexity Optimization Of Data Sorting Using Super Sort Algorithm Method",
                                authors:
                                  "Raoda Raoda and Amil Ahmad Ilham (Universitas Hasanuddin, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093463",
                                title:
                                  "Evaluating Vision Transformers Efficiency in Image Captioning",
                                authors:
                                  "Bintang Kevin Hizkia Samosir (Universitas Bina Nusantara, Indonesia); Sani M. Isa (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093540",
                                title:
                                  "Analysis of Stunting Prediction for Toddlers in Bekasi Regency Using the K-Nearest Neighbors and Random Forest Algorithms",
                                authors:
                                  "Kamelia Khoirunnisa and Putu Harry Gunawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093687",
                                title:
                                  "Web-based Application Predicting Cow Hoof Infections with 3D Modeling Scrapping Simulator and Treatment Recommendation",
                                authors:
                                  "Heart Angel J. Candelario, Patricia Ann R. Gray and Tricia V. Cruz (Pamantasan ng Lungsod ng Maynila, Philippines); Criselle J Centeno (University of the City of Manila, Philippines); Ariel Antwaun Rolando Sison (PLM, Philippines); Jetro L San Diego (University of the City of Manila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571094357",
                                title:
                                  "Analyzing the Effect of NPL, Profitability, and Mobile Banking on Bank Stock Prices During COVID-19 and Normal Times: Evidence from Indonesia",
                                authors:
                                  "Rachel Angela Yaputra, Joni Suhartono and Toto Rusmanto (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571094380",
                                title:
                                  "Adaptive Lineup Recommendation System for Basketball Coaching Using Multi Linear Regression and Decision Support Techniques",
                                authors:
                                  "Riley Gem Adriano Faustino, Jomarie G. Cuenco, Marvin Ross S. Galang, Criselle J Centeno, Ariel Sison and Benito Roger L De Joya (Pamantasan ng Lungsod ng Maynila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571094381",
                                title:
                                  "EmoShown: AI-Powered Emotional Wellness Hub with Sentiment Analysis, Anomaly Detection, and Collaborative Filtering",
                                authors:
                                  "Kiann A. Peñaredondo and Jaspher D. Camu (Pamantasan ng Lungsod ng Maynila, Philippines); Criselle J Centeno (Pamantasang ng Lungsod ng Maynila, Philippines); Mark Anthony S. Mercado, Vivien A. Agustin and Mary Grace N. Gonzales (Pamantasan ng Lungsod ng Maynila, Philippines)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571094454",
                                title:
                                  "Classification of Apple Leaf Diseases Using a Modified EfficientNet Model",
                                authors:
                                  "Muhammad Abiya Makruf and Febryanti Sthevanie (Telkom University, Indonesia); Kurniawan Nur Ramadhani (Universitas Telkom, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 7D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 7D",
                      description:
                        "Moderator: Bambang Pudjoatmodjo, S.Si., M.T., Ph.D.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "10:15",
                      end_time: "12:15",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571061716",
                                title:
                                  "Implementation of CNN Algorithm with ResNet-50 Architecture for Vehicle Image Classification",
                                authors:
                                  "Dilia Fadilah Mutmainah, Febryanti Sthevanie and Gamma Kosala (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571093009",
                                title:
                                  "Cure-Sne Model Detects Outliers in Data to Optimize the Process of Clustering Using Representatives",
                                authors:
                                  "Dewi Sartika Ginting and Syahril Effendi (Universitas Sumatera Utara, Indonesia); Amalia Amalia (University of Sumatera Utara, Indonesia); Poltak Sihombing (Universitas Sumatera Utara, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571095211",
                                title:
                                  "Optimizers Comparative Analysis on YOLOv8 and YOLOv11 for Small Object Detection",
                                authors:
                                  "Marshaniswah Syamsul (Telkom University, Indonesia & Jl. Telekomunikasi No. 1, Terusan Buah Batu, Bandung, Jawa Barat, Indonesia); Suryo Adhi Wibowo (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571095940",
                                title:
                                  "Betweenness Centrality on Public Opinion in the 2024 Indonesia Presidential Election Discussion on YouTube",
                                authors:
                                  "Widha Dwiyanti, Putri Rizky Alifiya, Muhammad Fauzal Dwiansyah and Warih Maharani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571097887",
                                title:
                                  "Hyperparameter Tuning to Improve Object Detection Performance in Handwritten Images",
                                authors:
                                  "Muhammad Haviz Irfani (University of Indo Global Mandiri, Indonesia); Samsuryadi Samsuryadi and Abdiansah Abdiansah (Universitas Sriwijaya, Indonesia); Rudi Heriansyah (Universitas Indo Global Mandiri, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571068081",
                                title:
                                  "Driver Anger Expression Detection: A Review",
                                authors:
                                  "Ong Jia Xiang (Multimedia University, Malaysia); Sumendra Yogarayan (Multimedia University (MMU), Malaysia); Jashila Nair Mogan and Pa Pa Min (Multimedia University, Malaysia); Afizan Azman (Taylor's University, Malaysia); Avenaish Sivaprakasam (AceTeam Networks, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571073879",
                                title:
                                  "Drunk Detection using Thermal-Based Face Images",
                                authors:
                                  "Lee Jian Seong (Multimedia University, Malaysia); Sumendra Yogarayan (Multimedia University (MMU), Malaysia); Siti Fatimah Abdul Razak and Jashila Nair Mogan (Multimedia University, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                              {
                                paper_id: "1571085152",
                                title:
                                  "Automated Tuna Freshness Assessment via Gas Sensors and Machine Learning Algorithms",
                                authors:
                                  "Nyoman Raflly Pratama, Ledya Novamizanti and Dedy Rahman Wijaya (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "10:15",
                                end_time: "12:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // ... (Lanjutan data Hari 2 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 8)
              {
                date: this.createDate("2024-12-18"),
                start_time: "11.15.00",
                end_time: "12.15.00",
                type: ScheduleType.TALK,
                notes: "Tutorial Session",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Tutorial Session : Dr. Ahsan Morshed\nSchool of Engineering and Technology, Central Quensland University, Australia\nTopic: Revolutionizing Data Science Education with ChatGPT: Applications and Benefits for Educators and Learners\nModerator:  Gde Palguna Reganata, S.Si., M.Si",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "12.15.00",
                end_time: "13.15.00",
                type: ScheduleType.BREAK,
                notes: "Lunch Break + ISOMA",
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "13.15.00",
                end_time: "14.15.00",
                type: ScheduleType.TALK,
                notes: "Keynote Speech #5 & Parallel Session 8",
                rooms: {
                  create: [
                    // Main Room
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Keynote Speech #5: Prof. Ts. Dr. Sazilah Salam\nProf of Multimedia, MOOCs, gamification, education technology and serious games at UTEM Malaysia.\nTopic: Graph-Based Learning Analytics\nModerator : Bambang Pudjoatmodjo, S.Si., M.T., Ph.D.",
                    },
                    // Room A (Parallel 8A)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 8A",
                      description:
                        "Moderator: Made Adhyatma Prawira Natha Kusuma, S.KM., M.KKK.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "13:15", // Sesuai data 4
                      end_time: "14:15", // Sesuai data 4
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571094277",
                                title:
                                  "Mapping the Evolution of Tourist Clusters: A Dynamic Modularity Approach in Multi-Destination Travel Analysis",
                                authors:
                                  "Muhammad Afif Alfarouq Samsuri, Andry Alamsyah and Dian Puteri Ramadhani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571094352",
                                title:
                                  "Female Gen Z's Perspectives Toward Beauty Social Media Influencer Attributes Based on TEARS Model",
                                authors:
                                  "Adsina Fibra (Unversitas Bina Nusantara, Indonesia); Adisha Nurina Maharani Danoehoesodo (Universitas Bina Nusantara, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571094379",
                                title:
                                  "User Acceptance And Behaviour Towards Tax Deduction Systems Adoption: An Integrated Technology Acceptance and Usage Model Perspective",
                                authors:
                                  "I Gusti Ayu Tresza Dharmayani (University of Bina Nusantara, Indonesia & Bina Nusantara University, Indonesia); I Gusti Karmawan and Levana Dhia Prawati (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571094624",
                                title:
                                  "Evaluating Customer Satisfaction on Indonesian Banking Artificial Intelligence-Driven Chatbot Services",
                                authors:
                                  "Michael Widjaja and Nilo Legowo (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 8B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 8B",
                      description:
                        "Moderator: Dr. Surya Michrandi Nasution, ST., MT.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "13:15",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088206",
                                title:
                                  "DMDA: A Computational Resource Allocation Approach for IoT Devices in Fog Computing",
                                authors:
                                  "Luthfan Hadi Pramono and Shan-Hsiang Shen (National Taiwan University of Science and Technology, Taiwan)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095468",
                                title:
                                  "The Cloud-Native Revolution: Microservices in a Cloud-Driven World",
                                authors:
                                  "Bindu Mohan Harve (Independent Researcher, USA); Darshan Mohan Bidkar (Netflix, USA); Manjunatha Sughaturu Krishnappa (Oracle, USA); Gokul Pandy (IEEE Senior Member, USA); Vivekananda Jayaram (Florida International University, USA); Prema K Veerapaneni and Gaurav Mehta (JPMorgan Chase, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095480",
                                title:
                                  "Cybersecurity in the Cloud Era: Protecting Virtualized Environments Against Evolving Threats",
                                authors:
                                  "Manjunatha Sughaturu Krishnappa (Oracle, USA); Prema K Veerapaneni (JPMorgan Chase, USA); Bindu Mohan Harve (Independent Researcher, USA); Vivekananda Jayaram (Florida International University, USA); Darshan Mohan Bidkar (Netflix, USA); Gaurav Mehta (JPMorgan Chase, USA); Vedamurthy Gejjegondanahalli Yogeshappa (Medecision, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095588",
                                title:
                                  "Implementation of Multi-Hop Mesh Networking using ESP32 for IoT Communication",
                                authors:
                                  "Saufik Ramadhan, Infall Syafalni, Nana Sutisna and Trio Adiono (Bandung Institute of Technology, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 8C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 8C",
                      description:
                        "Moderator: A.A Sagung Suari Dewi, S.Psi., M.Psi., Psikolog",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "13:15",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571094873",
                                title:
                                  "The Impact of User-Generated Content and Digitization in Green Marketing towards Green Consumer Behavior to Use E-commerce",
                                authors:
                                  "Angelia Hartanto Teng (Bina Nusantara University &amp; Information Systems Management Department, Indonesia); Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571094895",
                                title:
                                  "AI Chatbot Implementation on Government Websites: A Framework for Development, User Engagement, and Security for DHS Website",
                                authors:
                                  "Balaji Shesharao Ingole (Gainwell Technologies llc, USA); Manjunatha Sughaturu Krishnappa (Oracle, USA); Vivekananda Jayaram (Florida International University, USA); Gokul Pandy (IEEE Senior Member, USA); Amey Ram Banarse (YugabyteDB, USA); Vishnu Ramineni (Albertsons Companies, USA); Vidyasagar Parlapalli (KLA Corporation, USA); Seeram Mullankandy (Elumina Health & IEEE, Boston University, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571091263",
                                title:
                                  "TAM Expansion: Analysis on Factors Influencing Mobile Learning Adoption by Students",
                                authors:
                                  "Febry Ayu Dyah Ganevi and Rio Guntur Utomo (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571095085",
                                title:
                                  "Evaluation of a Long-Method Refactoring Technic Using Reusability Assessment Metrics Based On ISO/IEC 25023 in Php Program Code",
                                authors:
                                  "Tiara Rahmania Hadiningrum and Siti Rochimah (Institut Teknologi Sepuluh Nopember, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 8D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 8D",
                      description:
                        "Moderator: Julang Aryowiloto, S.I.P.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "13:15",
                      end_time: "14:15",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571065537",
                                title:
                                  "Comprehensive Review of Penetration Testing Approaches on Internet of Things (IoT) Devices",
                                authors:
                                  "Amni Bazilah Husna Nazarudin (Multimedia University, Malaysia); Sumendra Yogarayan (Multimedia University (MMU), Malaysia); Siti Fatimah Abdul Razak and Mohd Fikri Azli Abdullah (Multimedia University, Malaysia); Afizan Azman (Taylor's University, Malaysia); Daneshver Kumar (AceTeam Networks, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571080400",
                                title:
                                  "IoT-Driven Soil Moisture Monitoring for Optimizing Irrigation",
                                authors:
                                  "Dharwin Varathaiyah (Multimedia University, Malaysia); Sumendra Yogarayan (Multimedia University (MMU), Malaysia); Ee Mae Ang and Pa Pa Min (Multimedia University, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571089196",
                                title:
                                  "IoT Based Forest Fire Detection: Conceptualization and Implementation",
                                authors:
                                  "Rahkaesh Nair Uthaiya Nair (Multimedia University, Malaysia); Sumendra Yogarayan (Multimedia University (MMU), Malaysia); Mohd Fikri Azli Abdullah and Ee Mae Ang (Multimedia University, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                              {
                                paper_id: "1571094655",
                                title:
                                  "Teaching Gamified Cybersecurity Using the Metaverse: Challenges and Opportunities",
                                authors:
                                  "Erald Troja (St Johns University, USA); Joan E DeBello and Laura Truong (St. John's University, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "13:15",
                                end_time: "14:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // ... (Lanjutan data Hari 2 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 9)
              {
                date: this.createDate("2024-12-18"),
                start_time: "14.15.00",
                end_time: "16.15.00",
                type: ScheduleType.TALK,
                notes: "Parallel Session 9",
                rooms: {
                  create: [
                    // Room A (Parallel 9A - ONSITE)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 9A",
                      description:
                        "Moderator: I Wayan Palton Anuwiksa, S.Si., M.Si.",
                      type: RoomType.PARALLEL,
                      start_time: "14:15", // Sesuai data 4
                      end_time: "16:15", // Sesuai data 4
                      track: {
                        create: {
                          name: "Onsite Track Day 2 (Mixed 2)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571103309",
                                title:
                                  "GLCM-based Texture Features and Artificial Neural Network (ANN) for Accurate Detection of Melanoma and Basal Cell Carcinoma",
                                authors:
                                  "Satria Mandala (Universitas Telkom, Indonesia); Eva Krishna Sutedja (Padjajaran University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095057",
                                title:
                                  "Comparative Analysis of ResNet Architecture Enhanced with Self-Attention for Colorectal Cancer Detection",
                                authors:
                                  "Yonathan Fanuel Mulyadi and Fitri Utaminingrum (Universitas Brawijaya, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095358",
                                title:
                                  "Analyzing Key Predictors of Language Anxiety: Machine Learning Models for ELAS Prediction",
                                authors:
                                  "Alfian Akbar Gozali (Telkom University, Indonesia); Iis Nurhayati (Telkom University & Padjadjaran University, Indonesia); Gartika Rahmasari and Rian Andriani (ARS University, Indonesia)",
                                mode: TrackSessionMode.ONLINE, // Data ini tertulis 'Online'
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095393",
                                title:
                                  "Self-Driving Vehicles: Exploring Preferred Adoption Scenarios - A Preliminary Study",
                                authors:
                                  "Michael Khoyudia and Leonardo Iskandar (Bina Nusantara University, Indonesia); Minsani Mariani (Binus Business School, Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095668",
                                title:
                                  "Exploring Cloud Accounting Adoption Readiness Among Indonesian Small-Medium Enterprises",
                                authors:
                                  "Anderes Gui, Kevin Sierrano, Dea Novantia, Trinity Loren and Ridho Bramulya Ikhsan (Bina Nusantara University, Indonesia); Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571092817",
                                title:
                                  "Social Network Analysis and PowerBI Dashboard to Determine E-Wallet Marketing Strategies",
                                authors:
                                  "Abba Suganda Girsang (Bina Nusantara University, Indonesia); Rita Rita (Binus University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571093642",
                                title:
                                  "Propositions to analyse the application of intelligent systems in health care social organisations",
                                authors:
                                  "Ari Margiono (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095182",
                                title:
                                  "Parkinson's Tremor Suppression: A Spring-Based Passive Attenuator System",
                                authors:
                                  "Abdullah Kassim and Krittika Vasudevan (Kent and Medway Medical School, United Kingdom (Great Britain)); M A Hannan Bin Azhar and Soumya Kanti Manna (Canterbury Christ Church University, United Kingdom (Great Britain))",
                                mode: TrackSessionMode.OFFLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 9B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 9B",
                      description:
                        "Moderator: Dr. Surya Michrandi Nasution, ST., MT.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:15",
                      end_time: "16:15",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571088648",
                                title:
                                  "Parameter Optimization for Long Short-Term Memory (LSTM) and Bi-LSTM in Netflix Recommendation System",
                                authors:
                                  "Mohamad Irfan Nafiyanto and Erwin B. Setiawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571089755",
                                title:
                                  "Improving Offline Handwritten Text Recognition Accuracy with ADAM and SGD Optimizers and Convolutional Neural Networks Models",
                                authors:
                                  "Sarwo Sarwo (Binus Online Learning, Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095293",
                                title:
                                  "Social Network Analysis of Presidential Candidates: A Case Study of Prabowo-Gibran in Indonesia",
                                authors:
                                  "Yuko Gibran Crevila, Andry Alamsyah and Eva Nurhazizah (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095338",
                                title:
                                  "Temporal Sentiment Analysis of Politician XYZ on Social Media X Using FastText Word Embedding and Graph Neural Network Model",
                                authors:
                                  "Nurul Aini Afiqah and Fitriyani Fitriyani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571076170",
                                title:
                                  "Optimizing Menu Bundling Strategies through Apriori Algorithm in Sales Analysis",
                                authors:
                                  "Ahmad Sambang Setya Tama, Faqih Hamami and Taufik Adi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571088134",
                                title:
                                  "Comparison of machine learning classifiers on low birth weight in Indonesia: Study from Indonesia Demographic and Health Survey",
                                authors:
                                  "Muhammad Luthfi Setiarno Putera, Muhammad Norhadi and Ajeng Hijriatul Aulia (Institut Agama Islam Negeri Palangka Raya, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095080",
                                title:
                                  "Sentiment Analysis on Disco Elysium Video Game Reviews from Steam Using K-Nearest Neighbor Method and Chi-Square Feature Selection",
                                authors:
                                  "Rizka Marina Dewi, Mahendra Dwifebri Purbolaksono and Utami Kusuma Dewi (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095195",
                                title:
                                  "Data-Driven Telecommunication Infrastructure: AI Clustering and Geodesic Measurement for Strategic Tower Optimization",
                                authors:
                                  "Sadam Al Rasyid (Telkom University, Indonesia & Jl. Telekomunikasi. 1, Terusan Buah Batu, Bandung, Jawa Barat, Indonesia); Suryo Adhi Wibowo (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 9C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 9C",
                      description:
                        "Moderator: A.A Sagung Suari Dewi, S.Psi., M.Psi., Psikolog",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:15",
                      end_time: "16:15",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571089250",
                                title:
                                  "Object-Driven Fuzzy Decision Model for Assessing the Employees' Work from Home Eligibility",
                                authors:
                                  "Ditdit Nugeraha Utama (Bina Nusantara University, Indonesia); Christiawan Immanuel (BINUS University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095314",
                                title:
                                  "Implementation of Risk Assessment Analysis on Financial Technology Performance by SLR Method",
                                authors:
                                  "Gabriela Athena Juventeen (Bina Nusantara University); Drajad Wiryawan (Bina Nusantara University & PT. Kemuning Tours and Travel, Indonesia); Joni Suhartono (BiNus University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571097916",
                                title:
                                  "Online Travel Agencies (Ota) Marketing Strategy: Lesson Learn From Hotel Business Performance During The Covid-19 Pandemic",
                                authors:
                                  "Rajiv Dharma Mangruwa (Telkom University, Indonesia); Akbariah Mahdzir (Universiti Teknologi Malaysia, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571084963",
                                title:
                                  "Analysis of the Influence Between Facebook and Google Analytics 4 Ads on a Landing Page",
                                authors:
                                  "Riyan Leandros, Silvia Ayunda Murad, Jullend Gatc, Dina Fitria Murad, Dfm, Ilham Syahru Ramadhan and Bambang Wijanarko (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571089971",
                                title:
                                  "Mapping Research Blockchain Trends on Halal Supply Chain in Indonesia: a Bibliometric Analysis",
                                authors:
                                  "Rajiv Dharma Mangruwa and Akhmad Yunani (Telkom University, Indonesia); Muhamad Fauzan Nugraha, Fatimah Tuzzahra and Fitria Nasywa Syadira (School of Economics and Business Telkom University, Indonesia); Han Foon Neo (Multimedia University, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571093848",
                                title:
                                  "Streamlining ERP Implementation: Leveraging the ERP-T Model for Corporate Needs Analysis",
                                authors:
                                  "Yumna Zahran Ramadhan, Luthfi Ramadani, Muharman Lubis and Asha Sembiring (Telkom University, Indonesia); Fahdi Saidi Lubis (Universitas Telkom, Indonesia); Ni Ketut Mega Diana Putri (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571094617",
                                title:
                                  "Accelerating and Improving Public Services Through Village Digitalization: An Empirical Study of The Simpeldesa App in Baturinggit Village, Karangasem, Bali",
                                authors:
                                  "I Nyoman Karmani Kaynanda and Muhammad Zarlis (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095052",
                                title:
                                  "Clustering of Medical Hospitals Listed on the Stock Exchange in Indonesia and Malaysia Based on Efficiency Performance Using Data Envelopment Analysis and Cluster Analysis",
                                authors:
                                  "M Agis Maulana (Telkom University, Indonesia); Nora Amelda Rizal (Telkom University Bandung & School of Business and Management, Institut Teknologi Bandung, Indonesia); Fajra Octrina and Almi Jamilah (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 9D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 9D",
                      description:
                        "Moderator: Made Adhyatma Prawira Natha Kusuma, S.KM., M.KKK.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https.telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "14:15",
                      end_time: "16:15",
                      track: {
                        create: {
                          name: "Cybernetics and Data Science",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571094737",
                                title:
                                  "Lifestyle to Sleep Health: A CNN-LSTM Approach for Predicting Sleep Quality and Disorders",
                                authors:
                                  "Cherie Vartika Stephen and Tasmina Islam (King's College London, United Kingdom (Great Britain))",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095017",
                                title:
                                  "Feature Selection for Multilabel Classification of Student Feedback Using Filter and Metaheuristic Methods",
                                authors:
                                  "Hamzah Setiawan (Institut Teknologi Sepuluh November, Indonesia & Universitas Muhammadiyah Sidoarjo, Indonesia); Chastine Fatichah and Ahmad Saikhu (Institut Teknologi Sepuluh Nopember, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095213",
                                title:
                                  "Identification of Lung Disease via X-Ray Images Using Knowledge Distillation and Vision Transformer",
                                authors:
                                  "Brilliant Syifaa Nang Galih and Ledya Novamizanti (Telkom University, Indonesia); Fityanul Akhyar (Universiti Tunku Abdul Rahman, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095477",
                                title:
                                  "Enhancing Node Classification: Integrating Particle Swarm Optimization with Graph Convolutional Networks",
                                authors:
                                  "Maulin Nasari, Gabriel Asael Tarigan, Rilo Chandra Pradana, Nikita Ananda Putri Masaling and Jeffrey Junior Tedjasulaksana (Bina Nusantara University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571093084",
                                title:
                                  "NeuroSignal Precision: A Hierarchical Approach for Enhanced Insights in Parkinson's Disease Classification",
                                authors:
                                  "Kazi Shaharair Sharif (Oklahama State University, USA); Mohammed Majbah Uddin (Emporia State University, USA); Md Abubakkar (Midwestern State University, USA)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571090397",
                                title:
                                  "Customer Loyalty Prediction and Customer Segmentation: A Random Forest Prediction and PCA-Integrated K-Means++ Approach",
                                authors:
                                  "Geovanny C Natalia and Ririn Desanti (Universitas Multimedia Nusantara, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095368",
                                title:
                                  "Activity Management System with Automatic Priority Adjustment using Simple Multi-Attribute Rating Technique",
                                authors:
                                  "Monica Widiasri, Susana Limanto and Jordan Valentino Lomanto (University of Surabaya, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                              {
                                paper_id: "1571095560",
                                title:
                                  "Performance Analysis of Random Forest Algorithm for Customer Churn Prediction in the Telecommunications Sector",
                                authors:
                                  "Fathan Zhafiri Arshimny and A Adiwijaya (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "14:15",
                                end_time: "16:15",
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // ... (Lanjutan data Hari 2 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 10)
              {
                date: this.createDate("2024-12-18"),
                start_time: "16.15.00",
                end_time: "16.25.00",
                type: ScheduleType.BREAK,
                notes: "Coffee Break",
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "16.25.00",
                end_time: "17.40.00",
                type: ScheduleType.TALK,
                notes: "Parallel Session 10",
                rooms: {
                  create: [
                    // Room A (Parallel 10A - ONSITE)
                    {
                      name: "Room A",
                      identifier: "Parallel Session 10A",
                      description:
                        "Moderator: I Wayan Palton Anuwiksa, S.Si., M.Si.",
                      type: RoomType.PARALLEL,
                      start_time: "16:25", // Sesuai data 4
                      end_time: "17:40", // Sesuai data 4
                      track: {
                        create: {
                          name: "Onsite Track Day 2 (Mixed 3)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571093397",
                                title:
                                  "A Qualitative Study on Business Resilience and E-commerce Growth in Oman SMEs Context",
                                authors:
                                  "Ruksana Banu and Gopalakrishnan Soundararajan (Muscat College, Oman); Mohamed Salman (University of Auckland, New Zealand); Manal Khalfan Said Al Busaidi (Muscat College, Oman)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571069737",
                                title:
                                  "The impact of self-efficacy, perceived stress, and herd behavior on mobile phone addiction",
                                authors:
                                  "Fenfen Huang (Asia Eastern University of Science and Technology, Taiwan)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571065145",
                                title:
                                  "Evaluating human-machine interaction (HMI) paradigms for effective human-artificial intelligence (AI) collaboration in cybersecurity",
                                authors:
                                  "Masike Malatji (University of South Africa SBL, South Africa)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571095063",
                                title:
                                  "Integrating Accessibility Features and Usability Testing for Inclusive Web Design",
                                authors:
                                  "Herlina Herlina (Universitas Atma Jaya Yogyakarta, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571089102",
                                title:
                                  "Harnessing Content, Social Presence, Interactivity, and FOMO to Drive Purchase Intention in Live Shopping Experiences",
                                authors:
                                  "Vicky Vicky (Bina Nusantara Uninversity, Indonesia); Irsyad Nuryatama and Danindra Rasyad Rabbani Hanartyo (Bina Nusantara University, Indonesia); Erwin Halim (Bina Nusantara University & School of Information Systems, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571095138",
                                title:
                                  "Mobile-Based SMS Gateway Application using Cloud Computing Services",
                                authors:
                                  "Kristian Adi Nugraha (Duta Wacana Christian University, Indonesia)",
                                mode: TrackSessionMode.OFFLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room B (Parallel 10B)
                    {
                      name: "Room B",
                      identifier: "Parallel Session 10B",
                      description:
                        "Moderator: Julang Aryowiloto, S.I.P.,M.Hub.Int.",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "16:25",
                      end_time: "17:40",
                      track: {
                        create: {
                          name: "Cybernetics and Internet-of-Things (IoTs)",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095012",
                                title:
                                  "ROS-Based Multi-Quadcopter System for Enhancing Crowd Surveillance",
                                authors:
                                  "Setyawan Ajie Sukarno, Pipit Anggraeni and Mikhael Milianka (Bandung Polytechnic for Manufacturing, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571095167",
                                title:
                                  "Optimizing IoT Scalability and Resource Management Using Proof of Work-Directed Acyclic Graph: A Decentralized Approach",
                                authors:
                                  "Ayat Nadhum (University of Babylon, Iraq); Ahmed Mahdi Al-Salih III (University of Babylon & College of IT, Iraq)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571095617",
                                title:
                                  "Hybrid Optimization of MAC Features to Address Hidden Node Problems in 802.11ah Networks",
                                authors:
                                  "Muhammad Imam Sofwan Sofyan and Intan Sari Areni (Hasanuddin University, Indonesia); Wardi Wardi (Universitas Hasanuddin, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571089194",
                                title:
                                  "IoT-Enabled Asthma Risk Prediction: Advancements and Challenges",
                                authors:
                                  "Chuah Cheng Liang (Multimedia University, Malaysia); Sumendra Yogarayan (Multimedia University (MMU), Malaysia); Siti Fatimah Abdul Razak and Sharifah Noor Masidayu Sayed Ismail (Multimedia University, Malaysia); Afizan Azman (Taylor's University, Malaysia); Kavilan Raman (AceTeam Networks Sdn Bhd, Malaysia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571094133",
                                title:
                                  "Evaluating DETR, RetinaNet, and RTMDet Models for Object Detection in Rural Drone Imagery",
                                authors:
                                  "Luiz Eduardo A. Nora, Rafaella Laureano Dias and Felipe Augusto Pereira de Figueiredo (INATEL, Brazil); Samuel Mafra (Inatel, Brazil); Hugerles S. Silva (University of Brasilia, Brazil)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room C (Parallel 10C)
                    {
                      name: "Room C",
                      identifier: "Parallel Session 10C",
                      description:
                        "Moderator: A.A Sagung Suari Dewi, S.Psi., M.Psi., Psikolog",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "16:25",
                      end_time: "17:40",
                      track: {
                        create: {
                          name: "Cybernetics and Information Management in Business",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095104",
                                title:
                                  "An Object-Driven Fuzzy Decision Model for Determining Fuel in Boiler Machines",
                                authors:
                                  "Ditdit Nugeraha Utama (Bina Nusantara University, Indonesia); Jeremia Widyanto (BINUS University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571095291",
                                title:
                                  "Indirect Effect of Transformational and Transactional Leadership Toward Information Security Compliance Behavior: A Conceptual Approach in Healthcare",
                                authors:
                                  "Puspita Wulansari and Widia Maharani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571094626",
                                title:
                                  "The influence of ChatGPT (Open AI) on Customer Satisfaction in Higher Education",
                                authors:
                                  "Adriel Jonathan (Bina Nusantara University, Indonesia); Wahyu Sardjono (BINA NUSANTARA University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571087971",
                                title:
                                  "Ensuring Accountability of Waqf Management Systems Using A Systematic Literature Review Method",
                                authors:
                                  "Heppy Purbasari (Universiti Tun Hussein Onn Malaysia, Malaysia & Universitas Muhammadiyah Surakarta, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571094632",
                                title:
                                  "How Privacy and Security Concerns Impact the Intention to Engage with Personalization Using Cookies and Collected Data",
                                authors:
                                  "Jason Matthew (BINUS University, Indonesia); Wahyu Sardjono (BINA NUSANTARA University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                            ],
                          },
                        },
                      },
                    },
                    // Room D (Parallel 10D)
                    {
                      name: "Room D",
                      identifier: "Parallel Session 10D",
                      description:
                        "Moderator: Nyoman Trisna Aryanata, S.Psi.,M.A",
                      type: RoomType.PARALLEL,
                      online_meeting_url:
                        "https://telkomuniversity-ac-id.zoom.us/j/97324049829",
                      start_time: "16:25",
                      end_time: "17:40",
                      track: {
                        create: {
                          name: "Cybernetics and Biomedical Engineering",
                          track_sessions: {
                            create: [
                              {
                                paper_id: "1571095022",
                                title:
                                  "Development of a Combined Fabry-Perot and Fiber Bragg Grating Sensor for Accurate Temperature and Concentration Detection in Biological Applications",
                                authors:
                                  "Mohammed Raqeeb Thabit Mohammed Qaid (Kazan National Research Technical University Named After A. N. Tupolev, Russia); Timur Agliullin and Bulat I Valeev (Kazan National Research Technical University named after A. N. Tupolev - KAI, Russia); Alaa Naji Alhussein (Kazan National Research Technical University named after A. N. Tupolev - KAI, Iraq); Roman Makarov (Kazan National Research Technical University Named After A. N. Tupolev-KAI, Russia); Shamil Khastiev (Kazan National Research Technical University Named After A. N. Tupolev, Russia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571056130",
                                title:
                                  "Strategy of Customer Goods Company Through Instagram in Dealing With BDS Actions (Boycott, Divestment, Sanction)",
                                authors:
                                  "Amila Nafila Vidyana and Martha Tri Lestari (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                notes: "No video",
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571077216",
                                title:
                                  "An Evaluation of Institutional Web Page Profile Based on Eye Tracker",
                                authors:
                                  "Dino Caesaron and Farell Ardani (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571102316",
                                title:
                                  "Deep Learning-Based Exploration of YOLOv8 for Acne Vulgaris Type Classification and Lesion Counting",
                                authors:
                                  "Anaz Akbar Azhar (Telkom University, Indonesia); Ida Ayu Manik Partha Sutema (Bali International University, Indonesia); Putu Harry Gunawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                              {
                                paper_id: "1571101005",
                                title:
                                  "The Role of News Sentiment in Predicting the Jakarta Composite Index Using Long Short-Term Memory",
                                authors:
                                  "Zadosaadi Brahmantio Purwanto (Telkom University, Indonesia); Narita Aquarini (École Doctorale Science Economics Université de Poitiers Intervenant Finance, France); Indwiarti Indwiarti and Putu Harry Gunawan (Telkom University, Indonesia)",
                                mode: TrackSessionMode.ONLINE,
                                start_time: "16:25",
                                end_time: "17:40",
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // ... (Lanjutan data Hari 2 akan ada di respons berikutnya)
              // ... (Lanjutan dari bagian 11)
              {
                date: this.createDate("2024-12-18"),
                start_time: "17.40.00",
                end_time: "17.45.00",
                type: ScheduleType.TALK,
                notes:
                  "Closing Speech by Rector of Bali International University",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description:
                        "Closing Speech by Rector of Bali International University\nProf. Dr. dr. I Made Bakta, Sp. PD",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "17.45.00",
                end_time: "17.50.00",
                type: ScheduleType.TALK,
                notes: "Awarding, Next Event dan Closing Ceremony",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description: "Awarding, Next Event dan Closing Ceremony",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "17.50.00",
                end_time: "18.00.00",
                type: ScheduleType.TALK,
                notes: "GALA DINNER MOBILIZATION",
                rooms: {
                  create: [
                    {
                      name: "Main Room",
                      type: RoomType.MAIN,
                      description: "GALA DINNER MOBILIZATION",
                    },
                  ],
                },
              },
              {
                date: this.createDate("2024-12-18"),
                start_time: "18.00.00",
                end_time: "21.00.00",
                type: ScheduleType.TALK,
                notes: "Gala Dinner + Barong Dance Performace",
                rooms: {
                  create: [
                    {
                      name: "Laka Leke Restaurant",
                      type: RoomType.MAIN,
                      description:
                        "Laka Leke Restaurant (VIP + All Participant) + Barong Dance Performace",
                    },
                  ],
                },
              },
              // --- AKHIR HARI 2 ---

              // --- HARI 3: Kamis, 19 Desember 2024 ---
              {
                date: this.createDate("2024-12-19"),
                type: ScheduleType.ONE_DAY_ACTIVITY,
                notes: "One Day Tour",
                rooms: {
                  create: [
                    {
                      name: "One Day Tour",
                      type: RoomType.MAIN,
                      description:
                        "Botanical Garden -> Pasar Candi Kuning -> Handara Gate -> Beratan Lake -> Joger Bali -> Ubud Royal Palace. Please contact icicyta@telkomuniversity.ac.id if you are interested to join one day tour and Galla Dinner",
                    },
                  ],
                },
              },
              // --- AKHIR HARI 3 ---
            ],
          },
        },
      });

      console.log("Conference schedule seeding finished successfully.");
      console.log(
        `Created conference: ${conference.name} (ID: ${conference.id})`
      );
    });
  }
}

const seeder = new ConferenceScheduleSeeder();
seeder
  .seed()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await seeder.prisma.$disconnect();
  });
