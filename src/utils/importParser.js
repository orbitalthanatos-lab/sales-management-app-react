export function parseImportText(text) {

  const uploadIdMatch =
    text.match(
      /\[UPLOAD_ID:\s*(.*?)\]/
    );

  const uploadId =
    uploadIdMatch?.[1]?.trim() || '';

  const platforms = [];

  const platformSections = [
    'WALLAPOP',
    'VINTED',
    'MILANUNCIOS'
  ];

  platformSections.forEach((platform) => {

    const sectionRegex =
      new RegExp(
        `=== ${platform} ===([\\s\\S]*?)(?===|$)`,
        'i'
      );

    const sectionMatch =
      text.match(sectionRegex);

    if (!sectionMatch) {
      return;
    }

    const section =
      sectionMatch[1];

    const title =
      extractField(
        section,
        'TÍTULO'
      );

    const description =
      extractField(
        section,
        'DESCRIPCIÓN'
      );

    const price =
      extractField(
        section,
        'PRECIO'
      );

    const fees =
      extractField(
        section,
        'COMISION'
      );

    const buy =
      extractField(
        section,
        'COMPRA'
      );

    const link =
      extractField(
        section,
        `LINK ${platform}`
      );

    platforms.push({
      platform,
      title,
      description,
      price,
      fees,
      buy,
      link
    });

  });

  return {
    uploadId,
    platforms
  };

}

function extractField(
  section,
  field
) {

  const regex =
    new RegExp(
      `\\[${field}\\]\\s*([\\s\\S]*?)(?=\\n\\[|$)`,
      'i'
    );

  const match =
    section.match(regex);

  return match?.[1]?.trim() || '';

}