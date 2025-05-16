// src/components/ResumePDF.tsx
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../types';

// Register fonts if needed (optional)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderBottom: '1px solid #e0e0e0',
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
    borderBottom: '1px solid #000',
    paddingBottom: 3,
    color: '#333333',
  },
  item: {
    marginBottom: 8,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: 'bold',
  },
  certificate: {
    marginBottom: 15,
    padding: 10,
    borderBottom: '1px solid #e0e0e0',
  },
  customDesign: {
    marginBottom: 15,
    padding: 10,
    borderBottom: '1px solid #e0e0e0',
  },
});

export const ResumePDF = ({ resumeData }: { resumeData: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.header}>{resumeData.personalInfo.fullName}</Text>
        <Text style={styles.item}>{resumeData.personalInfo.email}</Text>
        <Text style={styles.item}>{resumeData.personalInfo.phone}</Text>
        {resumeData.personalInfo.linkedin && (
          <Text style={styles.item}>LinkedIn: {resumeData.personalInfo.linkedin}</Text>
        )}
        {resumeData.personalInfo.github && (
          <Text style={styles.item}>GitHub: {resumeData.personalInfo.github}</Text>
        )}
      </View>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Summary</Text>
          <Text style={styles.item}>{resumeData.personalInfo.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          {resumeData.skills.map((skill, index) => (
            <Text key={index} style={styles.item}>• {skill.name}</Text>
          ))}
        </View>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.bold}>{edu.institution}</Text>
              <Text>{edu.degree} ({edu.year})</Text>
              {edu.grade && <Text>Grade: {edu.grade}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.bold}>{exp.company}</Text>
              <Text>{exp.role} ({exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate})</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {resumeData.certifications.length > 0 && (
        <View style={styles.certificate}>
          <Text style={styles.sectionHeader}>Certifications</Text>
          {resumeData.certifications.map((cert, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.bold}>{cert.name}</Text>
              <Text>{cert.issuer} ({cert.date})</Text>
              {cert.link && <Text>Link: {cert.link}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Custom Design Section */}
      <View style={styles.customDesign}>
        <Text style={styles.sectionHeader}>Custom Design</Text>
        {/* Add custom design elements here */}
      </View>
    </Page>
  </Document>
);