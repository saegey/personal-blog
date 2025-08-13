import { graphql } from 'gatsby';
import { Box, Text } from 'theme-ui';

interface BlogTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
      };
      body: string;
    };
  };
}

const BlogTemplate = ({ data }: BlogTemplateProps) => {
  const { mdx } = data;
  return (
    <Box sx={{ maxWidth: '690px', margin: 'auto', padding: 4 }}>
      <Text as="h1" sx={{ fontSize: 5, fontWeight: 700, mb: 3 }}>
        {mdx.frontmatter.title}
      </Text>
      <Text as="p" sx={{ color: 'muted', mb: 4 }}>
        {mdx.frontmatter.date}
      </Text>
      <div className="blog-content">
        {/* MDX body will be rendered here by Gatsby */}
      </div>
    </Box>
  );
};

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`;

export default BlogTemplate;